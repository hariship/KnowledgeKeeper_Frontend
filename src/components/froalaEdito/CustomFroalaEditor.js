import React, { useState, useRef, useEffect, useCallback } from "react";
import FroalaEditorComponent from "react-froala-wysiwyg";
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/js/plugins/align.min.js";
import "froala-editor/js/plugins/char_counter.min.js";
import "froala-editor/js/plugins/colors.min.js";
import "froala-editor/css/plugins/colors.min.css";
import "froala-editor/js/plugins/draggable.min.js";
import "froala-editor/js/plugins/emoticons.min.js";
import "froala-editor/css/plugins/emoticons.min.css";
import "froala-editor/js/plugins/font_family.min.js";
import "froala-editor/js/plugins/font_size.min.js";
import "froala-editor/js/plugins/inline_style.min.js";
import "froala-editor/js/plugins/line_breaker.min.js";
import "froala-editor/js/plugins/link.min.js";
import "froala-editor/js/plugins/lists.min.js";
import "froala-editor/js/plugins/paragraph_format.min.js";
import "froala-editor/js/plugins/paragraph_style.min.js";
import "froala-editor/js/plugins/quote.min.js";
import "froala-editor/js/plugins/table.min.js";
// import "froala-editor/js/plugins/video.min.js";
// import "froala-editor/js/plugins/file.min.js";
import "froala-editor/js/plugins/special_characters.min.js";
// import "froala-editor/js/plugins/print.min.js";
import "froala-editor/js/plugins/help.min.js";
import "froala-editor/js/plugins/fullscreen.min.js";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins/word_paste.min.js";
// import "froala-editor/js/plugins/image.min.js";
// import "froala-editor/css/plugins/image.min.css";
import "froala-editor/css/froala_style.min.css";
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
    console.log(timeoutId, "TIme Out");
    console.log(delay, "Delay");
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
      console.log("Function called");
    }, delay);
  };
};
const FunctionalEditor = ({ activeItem }) => {
  const isFirstContentChange = useRef(true);
  const [requestData, setRequestData] = useState(null);
  const [model, setModel] = useState("");
  const [realTimeModel, setRealTimeModel] = useState("");
  const [showChangeRequest, setShowChangeRequest] = useState(false);
  const [showResolveWarning, setShowResolveWarning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const changedModelRef = useRef(model);
  const [currentRecommendationIndex, setCurrentRecommendationIndex] =
    useState(-2);
  // const [showDialog, setShowDialog] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const debounceDelay = 10000; // 5 minutes timer in milliseconds TODO 300000
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
      setIsLoading(true);
      setShowChangeRequest(false);
    }
    if (!showChangeRequest) {
      fetchData();
    }
    isFirstContentChange.current = true;
  }, [location]);

  //FETCH DOCUMENT DATA
  const fetchData = async () => {
    try {
      let response;

      //Fetch data for change-request (Byte based) recommendation
      if (location.pathname.includes("document-edit")) {
        response = await apiService.getRecommendationForByte(byteId);
        if (response) {
          setRequestData(response.data);
          navigate(
            `/home/${byteId}/document-edit/${response.data.documents[0].doc_id}`,
            {
              replace: true,
            }
          );
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
          } else {
            setRecommendationData([]);
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
    const htmlBlob = new Blob([newContent], { type: "text/html" });
    const htmlFile = new File([htmlBlob], fileName, {
      type: "text/html",
      lastModified: new Date().getTime(),
    });
    console.log("Model Filename", fileName);
    console.log("Model TO Be Updated", newContent);
    await apiService.uploadDocument(htmlFile, id, "5");
    changedModelRef.current = newContent;
    setIsDirty(false);
  };

  const debouncedUpload = debounce((newContent) => {
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
  }, [isDirty, location]);

  const handleUpdate = () => {
    if (isDirty) {
      uploadDocument(realTimeModelRef.current);
    }
  };

  const handleContentChange = (newContent) => {
    setIsDirty(true);
    debouncedUpload(newContent);
  };

  //Recommendation Functionality
  useEffect(() => {
    if (requestData) {
      // changedModelRef.current = model;
      // realTimeModelRef.current = model;
      placeCircles();
    }
  }, [model]);

  const addText = () => {
    if (!requestData) return;
    const recommendation = recommendationData[currentRecommendationIndex];
    if (recommendation) {
      const {
        section_main_heading1,
        section_main_heading2,
        section_main_heading3,
        section_main_heading4,
        change_request_text,
      } = recommendation;

      let filteredContent = change_request_text;
      const removeHeadingAndElement = (content, heading) => {
        if (!heading) return content;
        const regex = new RegExp(
          `<h[1-6][^>]*>[^<]*${heading}[^<]*<\\/h[1-6]>`,
          "gi"
        );
        return content.replace(regex, "");
      };

      filteredContent = removeHeadingAndElement(
        filteredContent,
        section_main_heading1
      );
      filteredContent = removeHeadingAndElement(
        filteredContent,
        section_main_heading2
      );
      filteredContent = removeHeadingAndElement(
        filteredContent,
        section_main_heading3
      );
      filteredContent = removeHeadingAndElement(
        filteredContent,
        section_main_heading4
      );

      const newModel = model + `${filteredContent}`;
      changedModelRef.current = newModel;
      setModel(newModel);
      setIsDirty(true);
    }
  };

  const replaceText = () => {
    if (!requestData) return;
    let parser = new DOMParser();
    let doc = parser.parseFromString(model, "text/html");
    let updatedModel = model;
    const recommendation = recommendationData[currentRecommendationIndex];
    if (recommendation) {
      const previousText = parseHtmlToNormalText(
        recommendation.previous_string
      );
      const {
        section_main_heading1,
        section_main_heading2,
        section_main_heading3,
        section_main_heading4,
        change_request_text,
      } = recommendation;
  
      let filteredContent = change_request_text;
  
      const removeHeadingAndElement = (content, heading) => {
        if (!heading) return content;
        const regex = new RegExp(
          `<h[1-6][^>]*>[^<]*${heading}[^<]*<\\/h[1-6]>`,
          "gi"
        );
        return content.replace(regex, "");
      };
      filteredContent = removeHeadingAndElement(
        filteredContent,
        section_main_heading1
      );
      console.log(filteredContent, "Filter Content");
      console.log("previous text", previousText);
      filteredContent = removeHeadingAndElement(
        filteredContent,
        section_main_heading2
      );
      filteredContent = removeHeadingAndElement(
        filteredContent,
        section_main_heading3
      );
      filteredContent = removeHeadingAndElement(
        filteredContent,
        section_main_heading4
      );
  
      const normalizeText = (text) => text.replace(/\s+/g, " ").trim();
      
      const allElements = doc.body.getElementsByTagName("*");
      Array.from(allElements).forEach((element) => {
        const elementText = normalizeText(element.innerHTML);
        if (elementText.includes(normalizeText(previousText))) {
          console.log("Found matching element");
          const replacedText = element.innerHTML.replace(
            normalizeText(previousText),
            filteredContent
          );
          element.innerHTML = replacedText;
        }
      });
  
      updatedModel = doc.body.innerHTML;  
    }
    setModel(updatedModel);  
  };

  const findHtmlInElement = (element, html) => {
    const parser = new DOMParser();
    const parsedHtml = parser
      .parseFromString(html, "text/html")
      .body.innerHTML.trim();

    if (
      element.nodeType === Node.ELEMENT_NODE ||
      element.nodeType === Node.TEXT_NODE
    ) {
      const normalizedElementHtml = element.innerHTML
        ? element.innerHTML.trim()
        : "";
      const normalizedElementText = element.textContent.trim();

      // Check both innerHTML and textContent to handle both HTML and plain text matches
      if (
        normalizedElementHtml.includes(parsedHtml) || // Check for parsed HTML
        normalizedElementText.includes(parsedHtml) // Check for text match
      ) {
        return element;
      }

      // Recursively check child elements
      for (let child of element.childNodes) {
        const found = findHtmlInElement(child, html);
        if (found) return found;
      }
    }
    return null;
  };

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
        const previousHtml = parseHtmlToNormalText(rec.previous_string);
        if (!previousHtml) {
          console.warn(
            `No previous HTML string for recommendation index ${index}`
          );
          return; 
        }

        const range = document.createRange();
        let elementFound = findHtmlInElement(tempDiv, previousHtml);
        console.log("Element found:", elementFound);
        if (elementFound) {
          console.log(`Element innerHTML:`, elementFound.innerHTML);
          const elementHtml = elementFound.innerHTML.trim();
          const startIndex = elementHtml.indexOf(previousHtml.trim());
          if (startIndex !== -1) {
            const node = elementFound.firstChild;
            if (node && node.nodeType === Node.TEXT_NODE) {
              range.setStart(node, startIndex);
              range.setEnd(node, startIndex + previousHtml.trim().length);
            } else if (node) {
              range.selectNodeContents(node);
            }

            const changeRequest = document.querySelector(
              ".change-request-container"
            );
            const changeRect = changeRequest.getBoundingClientRect();
            const editorRect = editorContainer.getBoundingClientRect();
            const rect = range.getBoundingClientRect();

            const x = editorRect.left + rect.left;
            const y = editorRect.top + window.scrollY + changeRect.height;

            addFloatingCircle(x, y, index + 1);
          } else {
            console.warn(
              `HTML "${previousHtml}" not found in element HTML:`,
              elementHtml
            );
          }
        } else {
          console.warn(`No element found for HTML "${previousHtml}".`);
        }
      });
    } else {
      console.warn("Editor container or recommendation data not found.");
    }
    document.body.removeChild(tempDiv);
  };

  const parseHtmlToNormalText = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  };
  const handleModelChange = useCallback((newModel) => {
    setModel(newModel);
  }, []);

  const highlightText = () => {
    if (!requestData || !activeRecommendation) {
      console.warn("No requestData or activeRecommendation found.");
      return;
    }

    let activeRecWithNewlines = activeRecommendation.replace(/\\n/g, "\n");
    console.log("Active Recommendation with newlines:", activeRecWithNewlines);

    let parser = new DOMParser();
    let doc = parser.parseFromString(model, "text/html");
    const normalizedRecommendation = parseHtmlToNormalText(
      activeRecWithNewlines
    );
    console.log("Normalized Recommendation:", normalizedRecommendation);
    clearPreviousHighlights(doc);
    const allElements = doc.body.getElementsByTagName("*");
    console.log("All elements to search:", allElements.length);

    Array.from(allElements).forEach((element, index) => {
      if (element.textContent.includes(normalizedRecommendation)) {
        console.log(
          `Match found in element at index ${index}:`,
          element.innerHTML
        );
        const highlightedContent = element.innerHTML.replace(
          normalizedRecommendation,
          `<mark>${normalizedRecommendation}</mark>` 
        );
        element.innerHTML = highlightedContent;
        console.log(
          `Updated innerHTML for element at index ${index}:`,
          element.innerHTML
        );
      }
    });

    const updatedModel = doc.documentElement.outerHTML;
    setModel(updatedModel); 
  };

  // Function to clear previous highlights
  const clearPreviousHighlights = (doc) => {
    // Clear previous highlights by replacing <mark> with empty string
    const originalInnerHTML = doc.body.innerHTML;
    doc.body.innerHTML = originalInnerHTML.replace(
      /<mark>(.*?)<\/mark>/g,
      "$1"
    );
    console.log(
      "Cleared previous highlights. New innerHTML:",
      doc.body.innerHTML
    );
  };

  //OLD
  // const highlightText = () => {
  //   if (!requestData || !activeRecommendation) return;
  //   let activeRecWithNewlines = activeRecommendation.replace(/\\n/g, "\n");
  //   let parser = new DOMParser();
  //   let doc = parser.parseFromString(model, "text/html");
  //   const normalizedRecommendation = parseHtmlToNormalText(
  //     activeRecWithNewlines
  //   );
  //   const allElements = doc.body.getElementsByTagName("*");
  //   Array.from(allElements).forEach((element) => {
  //     if (element.innerHTML.includes(normalizedRecommendation)) {
  //       const highlightedContent = element.innerHTML.replace(
  //         normalizedRecommendation,
  //         `<span style="background-color: #f7ffff;">${normalizedRecommendation}</span>`
  //       );
  //       element.innerHTML = highlightedContent;
  //     }
  //   });
  //   const updatedModel = doc.documentElement.outerHTML;
  //   // setModel(updatedModel);
  // };

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
  }, [activeRecommendation]); //TODO

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
      console.log(requestData, "Request Data for resolve");
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
      handleUpdate();
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
        title="Open AiEdits Pending"
        subtitle="Do you still wish to resolve the Change Request?"
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
                  onModelChange={handleModelChange}
                  config={{
                    toolbarSticky: true,
                    editorClass: "froala-editor",
                    spellcheck: true,
                    attribution: true,
                    heightMin: 200,
                    heightMax: 800,
                    placeholderText: "Edit your content here...",
                    toolbarVisibleWithoutSelection: true,
                    charCounterCount: true,
                    toolbarContainer: "#toolbar-container",
                    events: {
                      initialized: function () {
                        isFirstContentChange.current = true;
                        const secondToolbar =
                          document.querySelector(".fr-second-toolbar");
                        if (secondToolbar) {
                          secondToolbar.remove();
                        }
                      },
                      contentChanged: async function () {
                        const updatedModel = this.html.get();
                        changedModelRef.current = updatedModel;
                        setRealTimeModel(updatedModel);
                        if (isFirstContentChange.current) {
                          isFirstContentChange.current = false;
                        } else {
                          handleContentChange(updatedModel);
                        }
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
                    onTapAccept={() => {
                      if (recommendation.change_request_type === "Add") {
                        console.log("here is add text");
                        addText();
                      } else {
                        replaceText();
                      }
                    }}
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
