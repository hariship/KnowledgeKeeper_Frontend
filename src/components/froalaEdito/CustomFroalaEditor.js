import React, { useState, useRef, useEffect, useCallback } from "react";
import FroalaEditorComponent from "react-froala-wysiwyg";
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/css/froala_editor.pkgd.min.css";
import ChangeRequest from "./changeRequest.js";
import SuggestionCardComponent from "./SuggestionCardComponent";
import "./editor-style.css";
import { useLocation, useParams } from "react-router-dom";
import { apiService } from "../../services/apiService";
import RecommendationSkeletonLoader from "../loading-screen/RecommendationSkeleton.js";
import EditorSkeleton from "../loading-screen/EditorSkeleton.js";
import ResolveChangeRequestPopUp from "../PopUps/ResolveChangeRequestPopUp.js";

const FunctionalEditor = () => {
  const [requestData, setRequestData] = useState(null);
  const [model, setModel] = useState("");
  const [currentDocIndex, setCurrentDocIndex] = useState(0);
  const [showChangeRequest, setShowChangeRequest] = useState(false);
  const [showResolveWarning, setShowResolveWarning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const changedModelRef = useRef(model);
  const [currentRecommendationIndex, setCurrentRecommendationIndex] =
    useState(0);
  const [activeRecommendation, setActiveRecommendation] = useState("");
  const [recommendationData, setRecommendationData] = useState(null);
  const [editorWidth, setEditorWidth] = useState(850);
  const editorRef = useRef(null);
  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    if (location.pathname.includes("document-edit")) {
      setShowChangeRequest(true);
    } else if (location.pathname.includes("documents")) {
      setShowChangeRequest(false);
    }

    const fetchData = async () => {
      try {
        let response;
        if (location.pathname.includes("document-edit")) {
          response = await apiService.getRecommendationForByte(71); //CHANGE IT
          if (response) {
            setRequestData(response.data);
            // const url = response.data.documents[0].doc_content;
            const htmlResponse = await fetch(
              "https://knowledgekeeper-docs.s3.us-east-2.amazonaws.com/Doordash/Doordash.html",
              // url,
              { mode: "cors" }
            ); //TODO : ADD URL);
            const htmlBlob = await htmlResponse.blob();
            const htmlContent = await htmlBlob.text();
            if (response.data.documents) {
              if (response.data.documents[0]) {
                setRecommendationData(
                  response.data.documents[0].recommendations
                );
                setActiveRecommendation(
                  response.data.documents[0].recommendations[0].previous_string
                );
              }
            }
            setModel(htmlContent);
            setIsLoading(false);
          }
        } else if (location.pathname.includes("document") && id) {
          response = await apiService.getRecommendationSingleDoc(id);
          if (response) {
            setRequestData(response);
            console.log("here is response", response.data);
            // const url = response.data.document.doc_content;
            const url =
              "https://knowledgekeeper-docs.s3.us-east-2.amazonaws.com/Doordash/Doordash.html";

            const htmlResponse = await fetch(url, { mode: "cors" });
            const htmlBlob = await htmlResponse.blob();
            const htmlContent = await htmlBlob.text();
            setModel(htmlContent);
            setRecommendationData(response.data.document.bytes);
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [location, id]);

  //Handle size of change Request Header
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setEditorWidth(entry.contentRect.width);
      }
    });
    if (editorRef.current) {
      resizeObserver.observe(editorRef.current);
    }
    return () => {
      if (editorRef.current) {
        resizeObserver.unobserve(editorRef.current);
      }
    };
  }, [editorRef, model]);

  useEffect(() => {
    if (requestData) {
      changedModelRef.current = model;
      placeCircles();
    }
  }, [model, currentDocIndex, requestData]);

  const handleModelChange = useCallback((newModel) => {
    setModel(newModel);
  }, []);

  const replaceText = () => {
    if (!requestData) return;
    let parser = new DOMParser();
    let doc = parser.parseFromString(model, "text/html");
    let updatedModel = model;
    const recommendation = recommendationData[currentRecommendationIndex];
    if (recommendation) {
      const previousText = normalizeText(recommendation.previous_string);
      const targetElement = findTextInElement(doc.body, previousText);
      if (targetElement) {
        const updatedContent = recommendation.change_request_text;
        const content = targetElement.textContent;
        updatedModel = updatedModel.replace(content, updatedContent);
      }
    }
    setModel(updatedModel);
  };

  const findTextInElement = (element, text) => {
    if (
      element.nodeType === Node.TEXT_NODE &&
      element.textContent.includes(text)
    ) {
      return element;
    } else if (element.nodeType === Node.ELEMENT_NODE) {
      for (let child of element.childNodes) {
        const found = findTextInElement(child, text);
        if (found) return found;
      }
    }
    return null;
  };

  const highlightText = () => {
    if (!requestData) return;

    let parser = new DOMParser();
    let doc = parser.parseFromString(model, "text/html");
    let updatedModel = model;

    if (activeRecommendation) {
      let normalizedRecommendation = activeRecommendation
        .replace(/^\n/, "")
        .replace(/\n$/, "")
        .replace(/\n/g, " ");
      console.log("Normalized Recommendation:", normalizedRecommendation);
      if (
        normalizeText(doc.body.textContent).includes(normalizedRecommendation)
      ) {
        console.log("Text found in the document body.");
      } else {
        console.log("Text NOT found in the document body.");
      }
      const targetElement = findTextInElement(
        doc.body,
        normalizedRecommendation
      );
      console.log("***********************HERE IS Target", targetElement);

      if (targetElement) {
        const content = normalizeText(targetElement.textContent);
        console.log("New content:", content);
        const updatedContent = content.replace(
          normalizedRecommendation,
          `<span style="background-color: #f7ffff;">${normalizedRecommendation}</span>`
        );
        updatedModel = updatedModel.replace(content, updatedContent);
      }
    }

    setModel(updatedModel);
  };

  // Normalize function
  const normalizeText = (text) => {
    return text.replace(/\s+/g, " ").trim();
  };

  const addFloatingCircle = (x, y, index) => {
    const editorContainer = document.querySelector(".froala-editor");
    if (editorContainer) {
      const circle = document.createElement("div");
      circle.className = "floating-circle";
      const circleContent = document.createElement("span");
      circleContent.className = "circle-content";
      circleContent.textContent = index;
      circle.appendChild(circleContent);
      circle.style.position = "absolute";
      circle.style.left = `${x}px`;
      circle.style.top = `${y}px`;
      circle.style.zIndex = 10;
      circle.isHighlighted = false;

      // const handleClick = () => {
      //   if (circle.isHighlighted) {
      //     highlightText(index - 1, "white");
      //     circle.isHighlighted = false;
      //   } else {
      //     highlightText(index - 1, "yellow");
      //     circle.isHighlighted = true;
      //   }
      // };

      // circle.addEventListener("click", handleClick);
      editorContainer.appendChild(circle);
    }
  };

  useEffect(() => {
    highlightText();
  }, [activeRecommendation]);

  const placeCircles = () => {
    removeFloatingCircles();
    const tempDiv = document.createElement("div");
    tempDiv.style.position = "absolute";
    tempDiv.style.visibility = "hidden";
    tempDiv.style.top = "0";
    tempDiv.style.left = "0";
    tempDiv.innerHTML = model;
    document.body.appendChild(tempDiv);
    const editorContainer = document.querySelector(".froala-editor");
    if (editorContainer && recommendationData) {
      recommendationData.forEach((rec, index) => {
        const previousText = normalizeText(rec.previous_string);
        console.log("string to be matched", previousText);
        if (!previousText) return;
        const range = document.createRange();
        let elementFound = findTextInElement(tempDiv, previousText);
        console.log(elementFound, "Here is element found");
        if (elementFound) {
          const startIndex = elementFound.textContent.indexOf(previousText);
          range.setStart(elementFound, startIndex);
          range.setEnd(elementFound, startIndex + previousText.length);
          const changeRequest = document.querySelector(
            ".change-request-container"
          );
          const changeRect = changeRequest.getBoundingClientRect();
          const editorRect = editorContainer.getBoundingClientRect();
          const rect = range.getBoundingClientRect();
          const x = editorRect.left;
          const y = editorRect.top + window.scrollY + changeRect.height;
          addFloatingCircle(x, y, index + 1);
        } else {
        }
      });
    }

    document.body.removeChild(tempDiv);
  };

  const removeFloatingCircles = () => {
    const editorContainer = document.querySelector(".froala-editor");
    if (editorContainer) {
      const circles = editorContainer.querySelectorAll(".floating-circle");
      circles.forEach((circle) => circle.remove());
    }
  };
  const handleOpenResolveWarning = async () => {
    const status = await apiService.pendingRecommendation(
      requestData.request_id
    );
    if (status) {
      setShowResolveWarning(true);
    } else {
      handleResolveByte();
    }
  };

  const handleCloseResolveWarning = () => {
    setShowResolveWarning(false);
  };

  const handleResolveByte = async () => {
    await apiService.resolveByte(requestData.request_id);
    handleCloseResolveWarning();
  };
  const handlePrevious = () => {
    if (currentRecommendationIndex > 0) {
      setCurrentRecommendationIndex(currentRecommendationIndex - 1);
    } else if (currentDocIndex > 0) {
      setCurrentDocIndex(currentDocIndex - 1);
      setCurrentRecommendationIndex(
        requestData.documents[currentDocIndex - 1].recommendations.length - 1
      );
    }
    setActiveRecommendation(
      requestData.documents[currentDocIndex].recommendations[
        currentRecommendationIndex
      ].previous_string
    );
    updateModel();
  };

  const handleNext = () => {
    const totalRecommendations =
      requestData.documents[currentDocIndex].recommendations.length;
    if (currentRecommendationIndex < totalRecommendations - 1) {
      setCurrentRecommendationIndex(currentRecommendationIndex + 1);
    } else if (currentDocIndex < requestData.documents.length - 1) {
      setCurrentDocIndex(currentDocIndex + 1);
      setCurrentRecommendationIndex(0);
    }

    setActiveRecommendation(
      requestData.documents[currentDocIndex].recommendations[
        currentRecommendationIndex
      ].previous_string
    );
    updateModel();
  };

  const updateModel = () => {
    const docContent = requestData.documents[currentDocIndex].doc_content;
    setModel(docContent);
    removeFloatingCircles();
    placeCircles();
  };

  const handleOnTap = () => {
    setShowChangeRequest(false);
  };

  //LOADING
  if (isLoading) {
    return (
      <div id="editor" className="froala-editor-section">
        <div id="toolbar-container" className="toolbar-container"></div>
        <div style={{ paddingBottom: "15px" }}>
          <EditorSkeleton
            height="40px"
            borderRadius="100px"
            padding="4px 0px"
          />
        </div>
        <div className="editor-suggestion">
          <div className="change-request">
            <EditorSkeleton width="100%" height="100vh" borderRadius="4px" />
          </div>
          <RecommendationSkeletonLoader count={4} />
        </div>
      </div>
    );
  }

  // const totalRecommendations = requestData
  //   ? requestData.documents.reduce(
  //       (total, doc) => total + doc.recommendations.length,
  //       0
  //     )
  //   : 0;

  return (
    <div className="doc-editor">
      <ResolveChangeRequestPopUp
        isVisible={showResolveWarning}
        onClickLButton={handleResolveByte}
        onClickRButton={handleCloseResolveWarning}
        onClose={handleCloseResolveWarning}
        title="5 Open AiEdits" //change number
        subtitle="Do you still wish to resolve the Change Request ?"
        lButtonText="Resolve CR"
        rButtonText="View AiEdits"
      />
      <div id="editor" className="froala-editor-section fade-in">
        {/* Toolbar Container */}
        <div id="toolbar-container" className="toolbar-container"></div>
        <div className="editor-suggestion">
          <div className="change-request">
            {showChangeRequest && (
              <ChangeRequest
                onResolve={handleOpenResolveWarning}
                width={editorWidth}
                requester={requestData.request_id}
                date={requestData.date_time}
                message={requestData.request_text}
                aiEdits={`${currentRecommendationIndex + 1}/10`}
                // }/${totalRecommendations}`}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onTap={handleOnTap}
              />
            )}

            {isLoading ? (
              <EditorSkeleton />
            ) : (
              // Froala Editor
              <div ref={editorRef}>
                <FroalaEditorComponent
                  tag="textarea"
                  model={model}
                  onModelChange={handleModelChange}
                  config={{
                    toolbarSticky: true,
                    editorClass: "froala-editor",
                    spellcheck: true,
                    attribution: false,
                    heightMin: 200,
                    heightMax: 800,
                    placeholderText: "Edit your content here...",
                    toolbarVisibleWithoutSelection: true,
                    charCounterCount: true,
                    toolbarContainer: "#toolbar-container",
                    events: {
                      initialized: function () {
                        const secondToolbar =
                          document.querySelector(".fr-second-toolbar");
                        if (secondToolbar) {
                          secondToolbar.remove();
                        }
                      },
                      contentChanged: async function () {
                        const updatedModel = this.html.get();
                        // placeCircles();
                        const htmlBlob = new Blob([updatedModel], {
                          type: "text/html",
                        });
                        
                        const htmlFile = new File([htmlBlob],"document.html" ,{
                          type: "text/html",
                          lastModified: new Date().getTime(),
                        });
                        await apiService.uploadDocument(
                          htmlFile,
                          id,
                          "",
                          "",
                          "5"
                        ); //TODO: CHANGE DOCID HERE
                        changedModelRef.current = updatedModel;
                      },
                    },
                  }}
                />
              </div>
            )}
          </div>
          {isLoading ? (
            <RecommendationSkeletonLoader count={4} />
          ) : (
            <div>
              {recommendationData &&
                recommendationData.map((recommendation, index) => (
                  <SuggestionCardComponent
                    isLoading={true}
                    key={recommendation.id}
                    num={index + 1}
                    title={recommendation.change_request_type}
                    content={recommendation.change_request_text}
                    isActive={currentRecommendationIndex === index}
                    onTapAccept={replaceText}
                    onTapReject={() =>
                      console.log(
                        `Rejected recommendation ${
                          currentRecommendationIndex === index
                        }`
                      )
                    }
                    onCoverTap={() => {
                      setActiveRecommendation(recommendation.previous_string);
                      setCurrentRecommendationIndex(index);
                    }}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FunctionalEditor;
