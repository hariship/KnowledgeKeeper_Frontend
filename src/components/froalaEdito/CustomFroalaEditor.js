import React, { useState, useRef, useEffect, useCallback } from "react";
import FroalaEditorComponent from "react-froala-wysiwyg";
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/css/froala_editor.pkgd.min.css";
import ChangeRequest from "./ChangeRequest";
import SuggestionCardComponent from "./SuggestionCardComponent";
import "./editor-style.css";

const requestData = {
  request_id: "req-001",
  request_text:
    "Do you have a section for Knowledge Keeper which needs to be changed?",
  sender: "John Doe",
  date_time: "2024-07-12T14:00:00",
  documents: [
    {
      doc_id: "doc-101",
      doc_content:
        '<h2><span style="font-size: 30px; color: rgb(0, 0, 0); font-family: Georgia, serif;">Documentation:</span></h2><p>This is Temp testing part of.<span style="font-size: 14px; color: rgb(0, 0, 0); font-family: Georgia, serif; background-color: white;">This is the example of a edited document. This is the testing area for testing hello-world version of knowledge Keeper.</span><br/><br/><br/><br/><br/><br/><br/><span style="font-size: 14px; color: rgb(0, 0, 0); font-family: Georgia, serif; background-color: white;">This is the second example of a edited document. This is the second testing area for testing hello-world version of knowledge Keeper.</span><span style="font-family: Georgia,serif;"><br></span><br></p>',
      recommendations: [
        {
          id: "rec-002",
          change_request_type: "Add",
          change_request_text:
            "This is the testing area for testing hello-world version of knowledge Keeper.",
          previous_string: "This is the second example of a edited document.",
        },
        {
          id: "rec-001",
          change_request_type: "Replace",
          change_request_text:
            "Replace with: Nulla condimentum elit ipsum pharetra.",
          previous_string:
            "This is the testing area for testing hello-world version of knowledge Keeper.",
        },
      ],
    },
  ],
};

const FunctionalEditor = () => {
  const [model, setModel] = useState(requestData.documents[0].doc_content);
  const [currentDocIndex, setCurrentDocIndex] = useState(0);
  const [showChangeRequest, setShowChangeRequest] = useState(true);
  const changedModelRef = useRef(model);
  const totalDocuments = requestData.documents.length;
  const [activeRecommendation, setActiveRecommendation] = useState("");
  const [editorWidth, setEditorWidth] = useState(0);
  const editorRef = useRef(null);

  // Function to dynamically add data-location based on previous_string
  useEffect(() => {
    const addDataLocations = () => {
      let doc = document.createElement("div");
      doc.innerHTML = model;

      let modifiedContent = doc.innerHTML;
      requestData.documents[0].recommendations.forEach((rec, index) => {
        const regex = new RegExp(rec.previous_string, "g");
        modifiedContent = modifiedContent.replace(regex, (match) => {
          return `<span data-location="rec-${index}">${match}</span>`;
        });
      });

      // Only setModel if content has actually changed
      if (modifiedContent !== model) {
        setModel(modifiedContent);
      }
    };

    addDataLocations();
    // Ensure the effect only runs when recommendations change, not continuously
    // Remove `model` dependency to prevent infinite re-rendering
  }, [requestData.documents[0].recommendations]);

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
  }, [editorRef]);

  useEffect(() => {
    changedModelRef.current = model;
    placeCircles(model, requestData.documents[currentDocIndex].recommendations);
  }, [model, currentDocIndex]);

  const handleModelChange = useCallback((newModel) => {
    setModel(newModel);
  }, []);

  const replaceText = (index) => {
    let parser = new DOMParser();
    let doc = parser.parseFromString(model, "text/html");
    const { recommendations } = requestData.documents[currentDocIndex];
    let updatedModel = model;
    const recommendation = recommendations[index];
    if (recommendation) {
      const targetElement = doc.querySelector(`[data-location="rec-${index}"]`);
      if (targetElement) {
        const content = targetElement.innerHTML;
        const updatedContent = recommendation.change_request_text;
        updatedModel = updatedModel.replace(content, updatedContent);
      }
    }
    setModel(updatedModel);
  };

  const highlightText = (index, color) => {
    let parser = new DOMParser();
    let doc = parser.parseFromString(model, "text/html");
    const { recommendations } = requestData.documents[currentDocIndex];
    let updatedModel = model;
    const recommendation = recommendations[index];
    if (recommendation) {
      const targetElement = doc.querySelector(`[data-location="rec-${index}"]`);
      if (targetElement) {
        const content = targetElement.innerHTML;
        const updatedContent = `<span style="background-color:${color};">${content}</span>`;
        updatedModel = updatedModel.replace(content, updatedContent);
      }
    }
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

      const handleClick = () => {
        if (circle.isHighlighted) {
          highlightText(index - 1, "white");
          circle.isHighlighted = false;
        } else {
          highlightText(index - 1, "yellow");
          circle.isHighlighted = true;
        }
      };

      circle.addEventListener("click", handleClick);
      editorContainer.appendChild(circle);
    }
  };

  const placeCircles = (docContent, recommendations) => {
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
        const element = tempDiv.querySelector(`[data-location="rec-${index}"]`);
        if (element) {
          const rect = element.getBoundingClientRect();
          const x = rect.left + window.scrollX;
          const y = rect.top + window.scrollY;
          addFloatingCircle(x, y, index + 1);
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

  const handlePrevious = () => {
    if (currentDocIndex > 0) {
      removeFloatingCircles();
      setCurrentDocIndex(currentDocIndex - 1);
      setModel(requestData.documents[currentDocIndex - 1].doc_content);
    }
  };

  const handleNext = () => {
    if (currentDocIndex < totalDocuments - 1) {
      removeFloatingCircles();
      setCurrentDocIndex(currentDocIndex + 1);
      setModel(requestData.documents[currentDocIndex + 1].doc_content);
    }
  };

  const handleOnTap = () => {
    setShowChangeRequest(false);
  };

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
      <div id="editor" className="froala-editor-section">
        {/* Toolbar Container */}
        <div id="toolbar-container" className="toolbar-container"></div>
        <div className="editor-suggestion">
          <div className="change-request">
            {showChangeRequest && (
              <ChangeRequest
                width={editorWidth}
                requester={sender}
                date={date}
                time={time}
                message={request_text}
                aiEdits={`${currentDocIndex + 1}/${totalDocuments}`}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onTap={handleOnTap}
              />
            )}
            {/* Froala Editor */}
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
                      changedModelRef.current = updatedModel;
                    },
                  },
                }}
              />
            </div>
          </div>
          <div>
            {requestData.documents[currentDocIndex].recommendations.map(
              (recommendation, index) => (
                <SuggestionCardComponent
                  key={recommendation.id}
                  num={index + 1}
                  title={recommendation.change_request_type}
                  content={recommendation.change_request_text}
                  isActive={activeRecommendation === index}
                  onTapAccept={() => replaceText(index)}
                  onTapReject={() =>
                    console.log(`Rejected recommendation ${activeRecommendation === index}`)
                  }
                  onCoverTap={() => setActiveRecommendation(index)}
                />
              )
            )}
          </div>
        </div>
      </div>
    );
  }
  
  export default FunctionalEditor;