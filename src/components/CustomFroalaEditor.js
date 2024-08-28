import React, { useState, useRef, useEffect, useCallback } from 'react';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/js/plugins/align.min.js';
import 'froala-editor/js/plugins/char_counter.min.js';
import 'froala-editor/js/plugins/colors.min.js';
import 'froala-editor/css/plugins/colors.min.css';
import 'froala-editor/js/plugins/draggable.min.js';
import 'froala-editor/js/plugins/emoticons.min.js';
import 'froala-editor/css/plugins/emoticons.min.css';
import 'froala-editor/js/plugins/font_family.min.js';
import 'froala-editor/js/plugins/font_size.min.js';
import 'froala-editor/js/plugins/inline_style.min.js';
import 'froala-editor/js/plugins/line_breaker.min.js';
import 'froala-editor/js/plugins/link.min.js';
import 'froala-editor/js/plugins/lists.min.js';
import 'froala-editor/js/plugins/paragraph_format.min.js';
import 'froala-editor/js/plugins/paragraph_style.min.js';
import 'froala-editor/js/plugins/quote.min.js';
import 'froala-editor/js/plugins/table.min.js';
import 'froala-editor/js/plugins/video.min.js';
import 'froala-editor/js/plugins/file.min.js';
import 'froala-editor/js/plugins/special_characters.min.js';
import 'froala-editor/js/plugins/print.min.js';
import 'froala-editor/js/plugins/help.min.js';
import 'froala-editor/js/plugins/fullscreen.min.js';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins/word_paste.min.js';
import 'froala-editor/js/plugins/image.min.js';
import 'froala-editor/css/plugins/image.min.css';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/themes/dark.min.css';
import ChangeRequest from './froalaEdito/changeRequest';
import SuggestionCardComponent from './froalaEdito/SuggestionCardComponent';


const FunctionalEditor = ({ requestData }) => {
    const [model, setModel] = useState(requestData.documents[0].doc_content);
    const [currentDocIndex, setCurrentDocIndex] = useState(0);
    const [showChangeRequest, setShowChangeRequest] = useState(true);
    const changedModelRef = useRef(model);
    const totalDocuments = requestData.documents.length;
    const [activeRecommendation, setActiveRecommendation] = useState(0);

    useEffect(() => {
        changedModelRef.current = model;
        placeCircles(model, requestData.documents[currentDocIndex].recommendations);
    }, [model, currentDocIndex]);

    const handleModelChange = useCallback((newModel) => {
        setModel(newModel);
    }, []);

    const replaceText = (index) => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(model, 'text/html');
        const { recommendations } = requestData.documents[currentDocIndex];
        let updatedModel = model;
        const recommendation = recommendations[index];
        if (recommendation) {
            const recommendationKey = recommendation.previous_string;
            const targetElement = doc.querySelector(`[data-location="${recommendation.data_location}"]`);
            if (targetElement) {
                const content = targetElement.innerHTML;
                const regex = new RegExp(recommendationKey, 'g');
                const updatedContent = content.replace(regex, recommendation.change_request_text);
                updatedModel = updatedModel.replace(content, updatedContent);

            }
        }
        setModel(updatedModel);
    };
    const highlightText = (index, color) => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(model, 'text/html');
        const { recommendations } = requestData.documents[currentDocIndex];
        let updatedModel = model;
        const recommendation = recommendations[index];
        if (recommendation) {
            const recommendationKey = recommendation.previous_string;
            const targetElement = doc.querySelector(`[data-location="${recommendation.data_location}"]`);
            if (targetElement) {
                const content = targetElement.innerHTML;
                const regex = new RegExp(recommendationKey, 'g');
                const updatedContent = content.replace(regex, (match) =>
                    `<span style="background-color:${color};">${regex, match}</span>`
                );
                updatedModel = updatedModel.replace(content, updatedContent);
            }
        }
        setModel(updatedModel);
    };
    const addFloatingCircle = (x, y, index) => {
        const editorContainer = document.querySelector('.froala-editor');
        if (editorContainer) {
            const circle = document.createElement('div');
            circle.className = 'floating-circle';
            const circleContent = document.createElement('span');
            circleContent.className = 'circle-content';
            circleContent.textContent = index;
            circle.appendChild(circleContent);
            circle.style.left = `${x}px`;
            circle.style.top = `${y}px`;
            circle.isHighlighted = false;

            const handleClick = () => {
                if (circle.isHighlighted) {
                    // If highlighted, remove highlight and update state
                    console.log(`Removing highlight from index ${index}`);
                    highlightText(index - 1, 'white');
                    circle.isHighlighted = false;
                } else {
                    // If not highlighted, apply highlight and update state
                    console.log(`Adding highlight to index ${index}`);
                    highlightText(index - 1, 'yellow');
                    circle.isHighlighted = true;
                }
                console.log('Highlight state after click:', circle.isHighlighted);
            };
    
    


            circle.addEventListener('click', handleClick);
            editorContainer.appendChild(circle);
        }
    };

    const placeCircles = (docContent, recommendations) => {
        removeFloatingCircles();
        const tempDiv = document.createElement('div');
        tempDiv.style.position = 'absolute';
        tempDiv.style.visibility = 'hidden';
        tempDiv.style.top = '0';
        tempDiv.style.left = '0';
        tempDiv.innerHTML = docContent;
        document.body.appendChild(tempDiv);
        const editorContainer = document.querySelector('.froala-editor');
        const changeRequest = document.querySelector('.change-request-container')
        const changeRect = changeRequest.getBoundingClientRect();
        if (editorContainer) {
            const editorRect = editorContainer.getBoundingClientRect();

            recommendations.forEach((rec, index) => {
                const element = tempDiv.querySelector(`[data-location="${rec.data_location}"]`);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect) {
                        const x = editorRect.left + rect.left;
                        const y = rect.top + editorRect.top + changeRect.height;
                        addFloatingCircle(x, y, index + 1);
                    } else {
                    }
                } else {
                    console.log(`No element found for data-location="${rec.data_location}"`);
                }
            });
        }

        document.body.removeChild(tempDiv);
    };






    const addDataLocationAttributes = (html) => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(html, 'text/html');
        let counter = 0;

        const setDataLocation = (node, path) => {
            if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'BR') {
                node.setAttribute('data-location', path.join('-'));
                if (node.children.length > 0) {
                    for (let i = 0; i < node.children.length; i++) {
                        setDataLocation(node.children[i], [...path, i]);
                    }
                }
            }
        };

        for (let i = 0; doc.body && i < doc.body.children.length; i++) {
            setDataLocation(doc.body.children[i], ['doc', counter++]);
        }

        return doc.body ? doc.body.innerHTML : html;
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
    const removeFloatingCircles = () => {
        const editorContainer = document.querySelector('.froala-editor');
        if (editorContainer) {
            const circles = editorContainer.querySelectorAll('.floating-circle');
            circles.forEach(circle => circle.remove());
        }
    };
    const handleOnTap = () => {
        setShowChangeRequest(false);
    };

    // Extract date and time
    const { date_time, request_text, sender } = requestData;
    const date = new Date(date_time).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const time = new Date(date_time).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

    return (
        <div id="editor" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', border: 'none' }}>
            {/* Toolbar Container */}
            <div id="toolbarContainer" className='toolbarContainer'></div>
            <div className='editor-suggestion'>
                <div className='froala-editor' >
                    {showChangeRequest && (
                        <ChangeRequest
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
                    <FroalaEditorComponent
                        tag='textarea'
                        model={model}
                        onModelChange={handleModelChange}
                        config={{
                            toolbarSticky: true,
                            margin: 20,
                            editorClass: 'froala-editor',
                            padding: 20,
                            spellcheck: true,
                            attribution: false,
                            useClasses: false,
                            disableRightClick: true,
                            width: 1000,
                            fullPage: true,
                            heightMin: 100,
                            heightMax: 1500,
                            toolbarVisibleWithoutSelection: true,
                            placeholderText: 'Edit Your Content Here!',
                            charCounterCount: false,
                            toolbarContainer: '#toolbarContainer',
                            events: {
                                'initialized': function () {

                                    // highlightRecommendations("white", 0);
                                    const secondToolbar = document.querySelector('.fr-second-toolbar');
                                    if (secondToolbar) {
                                        secondToolbar.remove();
                                    }
                                },
                                'focus': function (e, editor) {
                                    console.log(e);
                                    // highlightText(0, 'white'); 
                                },
                                'contentChanged': function () {
                                    const updatedModel = this.html.get();
                                    const updatedModelWithLocation = addDataLocationAttributes(updatedModel);
                                    placeCircles(model, requestData.documents[currentDocIndex].recommendations);
                                    changedModelRef.current = updatedModelWithLocation;
                                }
                            }
                        }}
                    />
                </div>
                <div>
                    {requestData.documents[currentDocIndex].recommendations.map((recommendation, index) => (
                        <SuggestionCardComponent
                            key={recommendation.id}
                            num={index + 1}
                            title={recommendation.change_request_type}
                            content={recommendation.change_request_text}
                            isActive={activeRecommendation === index}
                            onTapAccept={() => replaceText(index)}
                            onTapReject={() => console.log(`Rejected recommendation ${activeRecommendation === index}`)}
                            onCoverTap={() => setActiveRecommendation(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FunctionalEditor;
