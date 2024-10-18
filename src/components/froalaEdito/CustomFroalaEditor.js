import React, { useState, useRef, useEffect, useCallback } from "react";
import FroalaEditorComponent from "react-froala-wysiwyg";
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/css/froala_editor.pkgd.min.css";
import ChangeRequest from "./changeRequest.js";
import SuggestionCardComponent from "./SuggestionCardComponent";
import "./editor-style.css";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { apiService } from "../../services/apiService";
import RecommendationSkeletonLoader from "../loading-screen/RecommendationSkeleton.js";
import EditorSkeleton from "../loading-screen/EditorSkeleton.js";
import ResolveChangeRequestPopUp from "../PopUps/ResolveChangeRequestPopUp.js";

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};
const FunctionalEditor = () => {
  const [requestData, setRequestData] = useState(null);
  const [model, setModel] = useState("");
  const [realTimeModel, setRealTimeModel] = useState("");
  const [currentDocIndex, setCurrentDocIndex] = useState(0);
  const [showChangeRequest, setShowChangeRequest] = useState(false);
  const [showResolveWarning, setShowResolveWarning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const changedModelRef = useRef(model);
  const [currentRecommendationIndex, setCurrentRecommendationIndex] =
    useState(-2);
  const [showDialog, setShowDialog] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  let debounceTimer;
  const debounceDelay = 300000; // 5 minutes timer in milliseconds

  const [fileName, setFileName] = useState("");
  const [activeRecommendation, setActiveRecommendation] = useState("");
  const [recommendationData, setRecommendationData] = useState(null);
  const [editorWidth, setEditorWidth] = useState(850);
  const editorRef = useRef(null);
  const realTimeModelRef = useRef(realTimeModel);

  const location = useLocation();
  const navigate = useNavigate();
  const { id, byteId } = useParams();

  useEffect(() => {
    if (location.pathname.includes("document-edit")) {
      setShowChangeRequest(true);
    } else if (location.pathname.includes("document")) {
      setShowChangeRequest(false);
    }
    if (!showChangeRequest) {
      fetchData();
    }
  }, [location]);

  useEffect(() => {
    fetchData();
  }, [byteId]);

  //FETCH DOCUMENT DATA
  const fetchData = async () => {
    try {
      let response;

      //Fetch data for change-request (Byte based) recommendation
      if (location.pathname.includes("document-edit")) {
        response = await apiService.getRecommendationForByte(byteId);
        if (response) {
          setRequestData(response.data);
          const url = response.data.documents[0].doc_content;
          const htmlResponse = await fetch(url, { mode: "cors" });
          const htmlBlob = await htmlResponse.blob();
          const htmlContent = await htmlBlob.text();
          setModel(htmlContent);
          if (response.data.documents && response.data.documents.length > 0) {
            let allRecommendations = [];

            const url = response.data.documents[0].doc_content;
            setFileName(url.substring(url.lastIndexOf("/") + 1));
            response.data.documents.forEach((document) => {
              const doc_id = document.doc_id;
              const doc_content = document.doc_content;

              const mappedRecommendations = document.recommendations.map(
                (rec) => ({
                  ...rec,
                  doc_content: doc_content,
                  byte_id: response.data.request_id,
                  doc_id: doc_id,
                })
              );
              allRecommendations = [
                ...allRecommendations,
                ...mappedRecommendations,
              ];
              // console.log(
              //   doc_id,
              //   "here is all recommendation",
              //   allRecommendations
              // );
            });

            setRecommendationData(allRecommendations);
            setCurrentRecommendationIndex(0);
            setActiveRecommendation(allRecommendations[0].previous_string);
          }

          setIsLoading(false);
        }
      } else if (location.pathname.includes("document")) {
        //Fetch data for document based recommendation
        response = await apiService.getRecommendationSingleDoc(id);
        if (response) {
          setRequestData(response);
          const url = response.data.document.doc_content;
          setFileName(url.substring(url.lastIndexOf("/") + 1));
          const htmlResponse = await fetch(url, { mode: "cors" });
          const htmlBlob = await htmlResponse.blob();
          const htmlContent = await htmlBlob.text();
          setModel(htmlContent);
          if (
            response.data.document.bytes &&
            response.data.document.bytes.length > 0
          ) {
            const doc_id = response.data.document.doc_id;
            const mappedRecommendations = response.data.document.bytes.flatMap(
              (byte) =>
                byte.recommendations.map((rec) => ({
                  ...rec,
                  doc_content: response.data.document.doc_content,
                  byte_id: byte.byteId,
                  doc_id: doc_id,
                }))
            );
            setRecommendationData(mappedRecommendations);
            // setActiveRecommendation(mappedRecommendations[0].previous_string);
          }

          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

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

  //Upload Document : 5 minutes delay
  const uploadDocument = async (newContent) => {
    if (newContent) {
      const htmlBlob = new Blob([newContent], { type: "text/html" });
      const htmlFile = new File([htmlBlob], fileName, {
        type: "text/html",
        lastModified: new Date().getTime(),
      });
      await apiService.uploadDocument(htmlFile, id, "5");
      changedModelRef.current = model;
      setIsDirty(false);
    }
  };

  const debouncedUpload = debounce((newContent) => {
    // clearTimeout(debounceTimer);
    console.log(newContent, "inside debouncedUpload");
    uploadDocument(newContent);
  }, debounceDelay);

  const handleBeforeUnload = (event) => {
    if (isDirty) {
      uploadDocument(realTimeModelRef.current);
      event.preventDefault();
      event.returnValue = "You have unsaved changes. Are you sure to leave?";
    }
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  useEffect(() => {
    const handlePopState = () => {
      if (isDirty) {
        // setShowDialog(true);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isDirty]);

  const handleUpdate = () => {
    uploadDocument(realTimeModelRef.current);
    setShowDialog(false);
  };

  const handleContentChange = (newContent) => {
    setRealTimeModel(newContent);
    setIsDirty(true);
    debouncedUpload(newContent);
  };

  //Recommendation Functionality
  useEffect(() => {
    if (requestData) {
      changedModelRef.current = model;
      realTimeModelRef.current = realTimeModel;
      placeCircles();
    }
  }, [realTimeModel]);

  const replaceText = () => {
    if (!requestData) return;
    let parser = new DOMParser();
    let doc = parser.parseFromString(model, "text/html");
    let updatedModel = model;
    const recommendation = recommendationData[currentRecommendationIndex];
    if (recommendation) {
      const previousText = recommendation.previous_string;
      const targetElement = findHtmlInElement(doc.body, previousText);
      if (targetElement) {
        const updatedContent = recommendation.change_request_text;
        const content = targetElement.textContent;
        updatedModel = updatedModel.replace(content, updatedContent);
      }
    }
    setModel(updatedModel);
  };

  const findHtmlInElement = (element, html) => {
    if (element.nodeType === Node.ELEMENT_NODE) {
      const normalizedElementHtml = element.outerHTML;
      if (normalizedElementHtml.includes(html)) {
        return element;
      }
      for (let child of element.childNodes) {
        const found = findHtmlInElement(child, html);
        if (found) return found;
      }
    }
    return null;
  };

  const parseHtmlToNormalText = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    return doc.body.textContent || ""; // Return text content without changing space structure
  };

  const highlightText = () => {
    if (!requestData || !activeRecommendation) return;

    // // Replace any newline escape characters in activeRecommendation
    // let activeRecWithNewlines = activeRecommendation.replace(/\\n/g, "\n");
    // console.log(activeRecommendation, "Here is active recom");
    let parser = new DOMParser();
    let doc = parser.parseFromString(model, "text/html");
    const normalizedRecommendation = parseHtmlToNormalText(activeRecommendation);
      // console.log("Normalized recommendation:1234", normalizedRecommendation);
    const allElements = doc.body.getElementsByTagName("*");
    Array.from(allElements).forEach((element) => {
      // console.log(
      //   element.innerHTML.includes(normalizedRecommendation),
      //   "here is"
      // );
      if (element.innerHTML.includes(normalizedRecommendation)) {
        const highlightedContent = element.innerHTML.replace(
          normalizedRecommendation,
          `<span style="background-color: #f7ffff;">${normalizedRecommendation}</span>` 
        );
        element.innerHTML = highlightedContent;
        console.log(
          "highlightedContent recommendation:",
          highlightedContent
        );
      }
    });
    const updatedModel = doc.documentElement.outerHTML;
    setModel(updatedModel);
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
      editorContainer.appendChild(circle);
    }
  };

  useEffect(() => {
    highlightText();
  }, [activeRecommendation]);

  //Place floating circle
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
        const previousText = rec.previous_string; 
        console.log("previousText",previousText);
        if (!previousText) return;
        const range = document.createRange();
        let elementFound = findHtmlInElement(tempDiv, previousText);
        console.log("element found",elementFound);
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

  //Handle Warning Pop Up
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
      updateModel();
    }
  };

  const handleNext = () => {
    if (currentRecommendationIndex < recommendationData.length - 1) {
      setCurrentRecommendationIndex(currentRecommendationIndex + 1);
      updateModel();
    }
  };

  const updateModel = async () => {
    setActiveRecommendation(
      recommendationData[currentRecommendationIndex].previous_string
    );
    const currentDocId = recommendationData[currentRecommendationIndex].doc_id;
    if (id !== currentDocId) {
      navigate(`/home/${byteId}/document-edit/${currentDocId}`, {
        replace: true,
      });
      const docContentUrl =
        recommendationData[currentRecommendationIndex].doc_content;
      const htmlResponse = await fetch(docContentUrl, { mode: "cors" });
      const htmlBlob = await htmlResponse.blob();
      const htmlContent = await htmlBlob.text();
      setModel(htmlContent);
    }
  };

  const handleOnTap = () => {
    setShowChangeRequest(false);
    setCurrentRecommendationIndex(-1);
    navigate(`/home/document/${id}`);
  };

  // const handleModelChange = (newModel) => {
  //   console.log("handle model change called", newModel);
  //   setModel(newModel);
  //   console.log("**********************************************\n");
  //   console.log(model, "Here is new model");
  // };

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
      {showDialog && (
        <div className="popup-overlay-custom">
          <div className="custom-dialog">
            <p>
              You have unsaved changes. Are you sure you want to continue? If
              you wish to keep your changes, please click the 'Update'.
            </p>
            <button onClick={handleUpdate}>Update</button>
          </div>
        </div>
      )}
      <div id="editor" className="froala-editor-section fade-in">
        {/* Toolbar Container */}
        <div id="toolbar-container" className="toolbar-container"></div>
        <div className="editor-suggestion">
          <div className="change-request">
            {showChangeRequest && (
              <ChangeRequest
                onResolve={handleOpenResolveWarning}
                width={editorWidth}
                requester={requestData.sender}
                date={requestData.date_time}
                message={requestData.request_text}
                aiEdits={`${currentRecommendationIndex + 1}/${
                  recommendationData.length
                }`}
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
                  // onModelChange={handleModelChange}
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
                        handleContentChange(updatedModel);
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
                    recommendationData={recommendation}
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
