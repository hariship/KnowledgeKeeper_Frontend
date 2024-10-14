import React, { useState, useRef, useEffect, useCallback } from "react";
import FroalaEditorComponent from "react-froala-wysiwyg";
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/css/froala_editor.pkgd.min.css";
import ChangeRequest from "./changeRequest.js";
import SuggestionCardComponent from "./SuggestionCardComponent";
import "./editor-style.css";
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
  const [editorWidth, setEditorWidth] = useState(850);
  const editorRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiService.getRecommendationForByte(36);
      //TODO:  ADD DOCID FLOW HERE
      setRequestData(response.data);
      const url = response.data.documents[0].doc_content;
      const htmlResponse = await fetch(
        "https://knowledgekeeper-docs.s3.us-east-2.amazonaws.com/Doordash/Doordash.html",
        { mode: "cors" }
      ); //TODO : ADD URL
      const htmlBlob = await htmlResponse.blob();
      const htmlContent = await htmlBlob.text();
      setActiveRecommendation(
        response.data.documents[0].recommendations[0].previousText ||
          "We display an estimated tax at checkout which may be updated later when your order is completed. Finalized tax will be shown on your order receipt."
      );
      setModel(htmlContent);
      setIsLoading(false);
      setShowChangeRequest(true);
    };
    fetchData();
  }, []);

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

  // useEffect(() => {
  //   if (requestData) {
  //     changedModelRef.current = model;
  //     placeCircles(
  //       model,
  //       requestData.documents[currentDocIndex].recommendations
  //     );
  //   }
  // }, [model, currentDocIndex, requestData]);

  const handleModelChange = useCallback((newModel) => {
    setModel(newModel);
  }, []);

  const replaceText = () => {
    if (!requestData) return;
    let parser = new DOMParser();
    let doc = parser.parseFromString(model, "text/html");
    const { recommendations } = requestData.documents[currentDocIndex];
    let updatedModel = model;
    const recommendation = recommendations[currentRecommendationIndex];
    console.log("here in recom", recommendation);
    if (recommendation) {
      const previousText =
        recommendation.previous_text ||
        "We display an estimated tax at checkout which may be updated later when your order is completed. Finalized tax will be shown on your order receipt."; // Example text

      const targetElement = findTextInElement(doc.body, previousText);
      if (targetElement) {
        console.log("Target element", targetElement);
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

    const { recommendations } = requestData.documents[currentDocIndex];
    let updatedModel = model;

    const recommendation = recommendations[currentRecommendationIndex];

    if (recommendation) {
      const previousText =
        recommendation.previous_text ||
        "We display an estimated tax at checkout which may be updated later when your order is completed. Finalized tax will be shown on your order receipt.";
      const targetElement = findTextInElement(doc.body, previousText);

      if (targetElement) {
        const content = targetElement.textContent;
        console.log("new content", content);
        const updatedContent = content.replace(
          previousText,
          `<span style="background-color: #f7ffff;">${previousText}</span>`
        );
        updatedModel = updatedModel.replace(content, updatedContent);
      }
    }

    setModel(updatedModel); // Update the model with the highlighted text
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

  const placeCircles = (docContent, recommendations) => {
    // console.log("Place cirle");
    removeFloatingCircles();
    const tempDiv = document.createElement("div");
    tempDiv.style.position = "absolute";
    tempDiv.style.visibility = "hidden";
    tempDiv.style.top = "0";
    tempDiv.style.left = "0";
    tempDiv.innerHTML = docContent;
    document.body.appendChild(tempDiv);

    const editorContainer = document.querySelector(".froala-editor");
    if (editorContainer) {
      recommendations.forEach((rec, index) => {
        const previousText =
          rec.previous_text ||
          "We display an estimated tax at checkout which may be updated later when your order is completed. Finalized tax will be shown on your order receipt."; // Example text
        if (!previousText) return;
        const range = document.createRange();
        let elementFound = findTextInElement(tempDiv, previousText);
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
          // console.log(editorRect,"editorrect");
          // console.log("rect",rect);
          // console.log("Place cirle",x,y);
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
    //TODO: ADD CHECKING IS ALL RECOMMENDATION ACCEPTED OR NOT

    setShowResolveWarning(true);
    // handleCloseResolveWarning();
  };

  const handleCloseResolveWarning = () => {
    setShowResolveWarning(false);
  };

  const handleResolveByte = async () => {
    await apiService.resolveByte(requestData.request_id);
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
      "We display an estimated tax at checkout which may be updated later when your order is completed. Finalized tax will be shown on your order receipt."
    );
    // setActiveRecommendation(requestData.documents[currentDocIndex].recommendations[currentRecommendationIndex].previousText);
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
      "We display an estimated tax at checkout which may be updated later when your order is completed. Finalized tax will be shown on your order receipt."
    );
    // setActiveRecommendation(requestData.documents[currentDocIndex].recommendations[currentRecommendationIndex].previousText);
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
  if (!requestData) {
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

  const totalRecommendations = requestData
    ? requestData.documents.reduce(
        (total, doc) => total + doc.recommendations.length,
        0
      )
    : 0;

  // Extract date and time
  const { date_time, request_text, sender } = requestData;
  const date = new Date(date_time).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const time = new Date(date_time).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div id="editor" className="froala-editor-section fade-in">
      <ResolveChangeRequestPopUp
        isVisible={showResolveWarning}
        onClickLButton={handleCloseResolveWarning}
        onClickRButton={handleResolveByte}
        onClose={handleCloseResolveWarning}
        title="5 Open AiEdits" //change number
        subtitle="Do you still wish to resolve the Change Request ?"
        lButtonText="Resolve CR"
        rButtonText="View AiEdits"
      />
      {/* Toolbar Container */}
      <div id="toolbar-container" className="toolbar-container"></div>
      <div className="editor-suggestion">
        <div className="change-request">
          {showChangeRequest && (
            <ChangeRequest
              onResolve={handleOpenResolveWarning}
              width={editorWidth}
              requester={sender}
              date={date}
              time={time}
              message={request_text}
              aiEdits={`${
                currentRecommendationIndex + 1
              }/${totalRecommendations}`}
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
                      placeCircles(
                        updatedModel,
                        requestData.documents[currentDocIndex].recommendations
                      );
                      const htmlBlob = new Blob([updatedModel], {
                        type: "text/html",
                      });
                      const fileName = `document_29.html`; //replace number with docId
                      const htmlFile = new File([htmlBlob], fileName, {
                        type: "text/html",
                        lastModified: new Date().getTime(),
                      });
                      await apiService.uploadDocument(htmlFile, "29", "5");
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
            {requestData.documents[currentDocIndex].recommendations.map(
              (recommendation, index) => (
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
                    setActiveRecommendation(
                      recommendation.previousText || "Default"
                    );
                    setCurrentRecommendationIndex(index);
                  }}
                />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FunctionalEditor;
