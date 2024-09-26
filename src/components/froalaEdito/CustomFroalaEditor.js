import React, { useState, useRef, useEffect, useCallback } from "react";
import FroalaEditorComponent from "react-froala-wysiwyg";
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
import "froala-editor/js/plugins/video.min.js";
import "froala-editor/js/plugins/file.min.js";
import "froala-editor/js/plugins/special_characters.min.js";
import "froala-editor/js/plugins/print.min.js";
import "froala-editor/js/plugins/help.min.js";
import "froala-editor/js/plugins/fullscreen.min.js";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins/word_paste.min.js";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/css/plugins/image.min.css";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/themes/dark.min.css";
import ChangeRequest from "./changeRequest";
import SuggestionCardComponent from "./SuggestionCardComponent";
import "./editor-style.css";
import { apiService } from "../../services/apiService";

const requestData = {
  request_id: "req-001",
  // request_text:"Simple Text",
  request_text:
    "Do you have a section for Knowledge Keeper which need to be changed Do you have a section for Knowledge Keeper which need to be changedDo you have a section for Knowledge Keeper which need to be changedDo you have a section for Knowledge Keeper which need to be changed Do you have a section for Knowledge Keeper which need to be changedDo you have a section for Knowledge Keeper which need to be changedDo you have a section for Knowledge Keeper which need to be changed Do you have a section for Knowledge Keeper which need to be changedDo you have a section for Knowledge Keeper which need to be changedDo you have a section for Knowledge Keeper which need to be changed Do you have a section for Knowledge Keeper which need to be changedDo you have a section for Knowledge Keeper which need to be changed?",
  sender: "John Doe",
  date_time: "2024-07-12T14:00:00",
  documents: [
    {
      doc_id: "doc-101",
      doc_content:
        '<h2 data-location="doc-0"><span style="font-size: 30px; color: rgb(0, 0, 0); font-family: Georgia, serif;" data-location="doc-0-0">Documentation:</span></h2><p data-location="doc-1">This is Temp testing part of.<span style="font-size: 14px; color: rgb(0, 0, 0); font-family: Georgia, serif; background-color: white;" data-location="doc-1-0">This is the example of a edited document. This is the testing area for testing hello-world version of knowledge Keeper.</span><br/><br/><br/><br/><br/><br/><br/><span style="font-size: 14px; color: rgb(0, 0, 0); font-family: Georgia, serif; background-color: white;" data-location="doc-1-3">This is the second example of a edited document. This is the second testing area for testing hello-world version of knowledge Keeper.</span><span style="font-family: Georgia,serif;" data-location="doc-1-1"><br></span><br></p>',
      recommendations: [
        {
          id: "rec-002",
          data_location: "doc-1-3",
          change_request_type: "Add",
          change_request_text:
            "Add this text This is the testing area for testing hello-world version of knowledge Keeper",
          previous_string: "This is the second example of a edited document.",
        },
        {
          id: "rec-001",
          data_location: "doc-1-0",
          change_request_type: "Replace",
          change_request_text:
            "Replace anchor definition is Nulla condimentum elit ipsum pharetra Replace anchor definition is Nulla condimentum elit ipsum pharetra Replace anchor definition is Nulla condimentum elit ipsum pharetra Replace anchor definition is Nulla condimentum elit ipsum pharetra Replace anchor definition is Nulla condimentum elit ipsum pharetra Replace anchor definition is Nulla condimentum elit ipsum pharetra Replace anchor definition is Nulla condimentum elit ipsum pharetra Replace anchor definition is Nulla condimentum elit ipsum pharetra Replace anchor definition is Nulla condimentum elit ipsum pharetraReplace anchor definition is Nulla condimentum elit ipsum pharetraReplace anchor definition is Nulla condimentum elit ipsum pharetraReplace anchor definition is Nulla condimentum elit ipsum pharetraReplace anchor definition is Nulla condimentum elit ipsum pharetra Replace anchor definition is Nulla condimentum elit ipsum pharetra Replace anchor definition is Replace anchor definition is Nulla condimentum elit ipsum pharetraReplace anchor definition is Nulla condimentum elit ipsum pharetraReplace anchor definition is Nulla condimentum elit ipsum pharetraReplace anchor definition is Nulla condimentum elit ipsum pharetraReplace anchor definition is Nulla condimentum elit ipsum pharetra Nulla condimentum elit ipsum pharetra Replace anchor definition is Nulla condimentum elit ipsum pharetra.",
          previous_string:
            "This is the testing area for testing hello-world version of knowledge Keeper",
        },
        {
          id: "rec-003",
          data_location: "doc-1-3-6",
          change_request_type: "Add",
          change_request_text:
            "Add this text This is the testing area for testing hello-world version of knowledge Keeper",
          previous_string: "This is the second example of a edited document.",
        },
        {
          id: "rec-004",
          data_location: "doc-1-0-5",
          change_request_type: "Replace",
          change_request_text:
            "Replace anchor definition is Nulla condimentum elit ipsum pharetra Replace anchor definition is Nulla condimentum elit ipsum pharetra Replace anchor definition is Nulla condimentum elit ipsum pharetra Replace anchor definition is Nulla condimentum elit ipsum pharetra Replace anchor definition is Nulla condimentum elit ipsum pharetra Replace anchor definition is Nulla condimentum elit ipsum pharetra Replace anchor definition is Nulla condimentum elit ipsum pharetra Replace anchor definition is Nulla condimentum elit ipsum pharetra Replace anchor definition is Nulla condimentum elit ipsum pharetraReplace anchor definition is Nulla condimentum elit ipsum pharetraReplace anchor definition is Nulla condimentum elit ipsum pharetraReplace anchor definition is Nulla condimentum elit ipsum pharetraReplace anchor definition is Nulla condimentum elit ipsum pharetra Replace anchor definition is Nulla condimentum elit ipsum pharetra Replace anchor definition is Replace anchor definition is Nulla condimentum elit ipsum pharetraReplace anchor definition is Nulla condimentum elit ipsum pharetraReplace anchor definition is Nulla condimentum elit ipsum pharetraReplace anchor definition is Nulla condimentum elit ipsum pharetraReplace anchor definition is Nulla condimentum elit ipsum pharetra Nulla condimentum elit ipsum pharetra Replace anchor definition is Nulla condimentum elit ipsum pharetra.",
          previous_string:
            "This is the testing area for testing hello-world version of knowledge Keeper",
        },
        {
          id: "rec-005",
          data_location: "doc-1-3-2",
          change_request_type: "Add",
          change_request_text:
            "Add this text This is the testing area for testing hello-world version of knowledge Keeper",
          previous_string: "This is the second example of a edited document.",
        },
        {
          id: "rec-006",
          data_location: "doc-1-0-1",
          change_request_type: "Replace",
          change_request_text:
            "Replace anchor definition is Nulla condimentum elit ipsum pharetra Replace anchor definition is Nulla condimentum elit ipsum pharetra Replace anchor definition is Nulla condimentum elit ipsum pharetra Replace anchor definition is Nulla condimentum elit ipsum pharetra Replace anchor definition is Nulla condimentum elit ipsum pharetra Replace anchor definition is Nulla condimentum elit ipsum pharetra Replace anchor definition is Nulla condimentum elit ipsum pharetra Replace anchor definition is Nulla condimentum elit ipsum pharetra Replace anchor definition is Nulla condimentum elit ipsum pharetraReplace anchor definition is Nulla condimentum elit ipsum pharetraReplace anchor definition is Nulla condimentum elit ipsum pharetraReplace anchor definition is Nulla condimentum elit ipsum pharetraReplace anchor definition is Nulla condimentum elit ipsum pharetra Replace anchor definition is Nulla condimentum elit ipsum pharetra Replace anchor definition is Replace anchor definition is Nulla condimentum elit ipsum pharetraReplace anchor definition is Nulla condimentum elit ipsum pharetraReplace anchor definition is Nulla condimentum elit ipsum pharetraReplace anchor definition is Nulla condimentum elit ipsum pharetraReplace anchor definition is Nulla condimentum elit ipsum pharetra Nulla condimentum elit ipsum pharetra Replace anchor definition is Nulla condimentum elit ipsum pharetra.",
          previous_string:
            "This is the testing area for testing hello-world version of knowledge Keeper",
        },
      ],
    },
    {
      doc_id: "doc-102",
      doc_content:
        '<h2 data-location="doc-0"><span style="font-size: 30px; color: rgb(0, 0, 0); font-family: Georgia, serif;" data-location="doc-0-0">Documentation 2:</span></h2><p dir="ltr" style="line-height:1.38;margin-left: 36pt;margin-top:0pt;margin-bottom:0pt;" id="isPasted" data-location="doc-1"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" data-location="doc-1-0">SUGGESTION:</span></p><ul style="margin-top:0;margin-bottom:0;padding-inline-start:48px;" data-location="doc-2"><li dir="ltr" style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;" data-location="doc-2-0"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;" data-location="doc-2-0-0"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" data-location="doc-2-0-0-0">Add option export as pdf:&nbsp;</span><a href="https://froala.com/wysiwyg-editor/examples/export-pdf/" style="text-decoration: none; user-select: auto;" fr-original-style="text-decoration:none;" data-location="doc-2-0-0-1"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#1155cc;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:underline;-webkit-text-decoration-skip:none;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" data-location="doc-2-0-0-1-0">https://froala.com/wysiwyg-editor/examples/export-pdf/</span></a></p></li><li dir="ltr" style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;" data-location="doc-2-1"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;" data-location="doc-2-1-0"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" data-location="doc-2-1-0-0">Quick Toolbar Option:&nbsp;</span><a href="https://froala.com/wysiwyg-editor/examples/quick-insert/" style="text-decoration: none; user-select: auto;" fr-original-style="text-decoration:none;" data-location="doc-2-1-0-1"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#1155cc;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:underline;-webkit-text-decoration-skip:none;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" data-location="doc-2-1-0-1-0">https://froala.com/wysiwyg-editor/examples/quick-insert/</span></a></p></li><li dir="ltr" style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;" data-location="doc-2-2"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;" data-location="doc-2-2-0"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" data-location="doc-2-2-0-0">Read Time Editing:</span><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" data-location="doc-2-2-0-1"><br></span><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" data-location="doc-2-2-0-2">CODOX:&nbsp;</span><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" data-location="doc-2-2-0-3"><br></span><a href="https://froala.com/wysiwyg-editor/examples/codox-real-time-editing/" style="text-decoration: none; user-select: auto;" fr-original-style="text-decoration:none;" data-location="doc-2-2-0-4"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#1155cc;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:underline;-webkit-text-decoration-skip:none;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" data-location="doc-2-2-0-4-0">https://froala.com/wysiwyg-editor/examples/codox-real-time-editing/</span></a></p></li><li dir="ltr" style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;" data-location="doc-2-3"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;" data-location="doc-2-3-0"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" data-location="doc-2-3-0-0">Spelling &amp; grammar Check:&nbsp;</span><a href="https://froala.com/wysiwyg-editor/examples/web-spell-checker/" style="text-decoration: none; user-select: auto;" fr-original-style="text-decoration:none;" data-location="doc-2-3-0-1"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#1155cc;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:underline;-webkit-text-decoration-skip:none;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" data-location="doc-2-3-0-1-0">https://froala.com/wysiwyg-editor/examples/web-spell-checker/</span></a></p></li><li dir="ltr" style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;" data-location="doc-2-4"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;" data-location="doc-2-4-0"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" data-location="doc-2-4-0-0">Changes:</span><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" data-location="doc-2-4-0-1"><br></span><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" data-location="doc-2-4-0-2">Create Request</span><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" data-location="doc-2-4-0-3"><br></span><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" data-location="doc-2-4-0-4">Close request.</span></p></li></ul><p dir="ltr" style="line-height:1.38;margin-left: 36pt;margin-top:0pt;margin-bottom:0pt;" data-location="doc-3"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" data-location="doc-3-0">Add Auto Save and Update Manual button for better Ui</span><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" data-location="doc-3-1"><br></span><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" data-location="doc-3-2">Add option export as pdf</span></p><p dir="ltr" style="line-height:1.38;margin-left: 36pt;margin-top:0pt;margin-bottom:0pt;" data-location="doc-4"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" data-location="doc-4-0">Insert Tables</span></p><ul style="margin-top:0;margin-bottom:0;padding-inline-start:48px;" data-location="doc-5"><li dir="ltr" style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;" data-location="doc-5-0"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;" data-location="doc-5-0-0"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" data-location="doc-5-0-0-0">TRACK CHANGES :&nbsp;</span><a href="https://froala.com/wysiwyg-editor/examples/track-changes/" style="text-decoration: none; user-select: auto;" fr-original-style="text-decoration:none;" data-location="doc-5-0-0-1"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#1155cc;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:underline;-webkit-text-decoration-skip:none;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" data-location="doc-5-0-0-1-0">https://froala.com/wysiwyg-editor/examples/track-changes/</span></a></p></li><li dir="ltr" style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;" data-location="doc-5-1"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;" data-location="doc-5-1-0"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" data-location="doc-5-1-0-0">Sticky Toolbar:&nbsp;</span><a href="https://froala.com/wysiwyg-editor/examples/sticky-toolbar/" style="text-decoration: none; user-select: auto;" fr-original-style="text-decoration:none;" data-location="doc-5-1-0-1"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#1155cc;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:underline;-webkit-text-decoration-skip:none;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" data-location="doc-5-1-0-1-0">https://froala.com/wysiwyg-editor/examples/sticky-toolbar/</span></a></p></li><li dir="ltr" style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;" data-location="doc-5-2"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;" data-location="doc-5-2-0"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" data-location="doc-5-2-0-0">Edit In popup:&nbsp;</span><a href="https://froala.com/wysiwyg-editor/examples/edit-in-popup/" style="text-decoration: none; user-select: auto;" fr-original-style="text-decoration:none;" data-location="doc-5-2-0-1"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#1155cc;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:underline;-webkit-text-decoration-skip:none;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" data-location="doc-5-2-0-1-0">https://froala.com/wysiwyg-editor/examples/edit-in-popup/</span></a></p></li></ul><p data-location="doc-6"><br></p><p data-location="doc-7"><br></p><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;" data-location="doc-8"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" data-location="doc-8-0">Note:Max file size</span></p>',
      recommendations: [
        {
          id: "rec-000",
          data_location: "doc-5-2-0-0",
          change_request_type: "Add",
          change_request_text:
            "Add this text This is the testing area for testing hello-world version of knowledge Keeper",
          previous_string: "Edit In popup",
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
  const [changeRectHeight, setChangeRectHeight] = useState(100);
  const changeRequestRef = useRef(null);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setChangeRectHeight(entry.contentRect.height); 
      }
    });

    if (changeRequestRef.current) {
      observer.observe(changeRequestRef.current); 
    }

    return () => {
      if (changeRequestRef.current) {
        observer.unobserve(changeRequestRef.current); 
      }
    };
  }, []);

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
      const recommendationKey = recommendation.previous_string;
      const targetElement = doc.querySelector(
        `[data-location="${recommendation.data_location}"]`
      );
      if (targetElement) {
        const content = targetElement.innerHTML;
        const regex = new RegExp(recommendationKey, "g");
        const updatedContent = content.replace(
          regex,
          recommendation.change_request_text
        );
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
      const recommendationKey = recommendation.previous_string;
      const targetElement = doc.querySelector(
        `[data-location="${recommendation.data_location}"]`
      );
      if (targetElement) {
        const content = targetElement.innerHTML;
        const regex = new RegExp(recommendationKey, "g");
        const updatedContent = content.replace(
          regex,
          (match) =>
            `<span style="background-color:${color};">${(regex, match)}</span>`
        );
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
      circle.style.left = `${x}px`;
      circle.style.top = `${y}px`;
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
        const element = tempDiv.querySelector(
          `[data-location="${rec.data_location}"]`
        );
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect) {
            const x = rect.left + window.scrollX;
            const y = rect.top + window.scrollY;
            addFloatingCircle(x, y, index + 1);
          } else {
          }
        } else {
        }
      });
    }

    document.body.removeChild(tempDiv);
  };

  const addDataLocationAttributes = (html) => {
    let parser = new DOMParser();
    let doc = parser.parseFromString(html, "text/html");
    let counter = 0;

    const setDataLocation = (node, path) => {
      if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== "BR") {
        node.setAttribute("data-location", path.join("-"));
        if (node.children.length > 0) {
          for (let i = 0; i < node.children.length; i++) {
            setDataLocation(node.children[i], [...path, i]);
          }
        }
      }
    };

    for (let i = 0; doc.body && i < doc.body.children.length; i++) {
      setDataLocation(doc.body.children[i], ["doc", counter++]);
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
    const editorContainer = document.querySelector(".froala-editor");
    if (editorContainer) {
      const circles = editorContainer.querySelectorAll(".floating-circle");
      circles.forEach((circle) => circle.remove());
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
          <div style={{ height: `${changeRectHeight}px` }}></div>
          <FroalaEditorComponent
            tag="textarea"
            model={model}
            onModelChange={handleModelChange}
            config={{
              toolbarSticky: true,
              editorClass: "froala-editor",
              padding: 0,
              spellcheck: true,
              attribution: false,
              useClasses: false,
              fullPage: true,
              heightMin: 100,
              heightMax: 1500,
              toolbarVisibleWithoutSelection: true,
              placeholderText: "Heading",
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
                focus: function (e, editor) {},
                contentChanged: async function () {
                  const updatedModel = this.html.get();
                  const updatedModelWithLocation =
                    addDataLocationAttributes(updatedModel);
                  placeCircles(
                    model,
                    requestData.documents[currentDocIndex].recommendations
                  );
                  changedModelRef.current = updatedModelWithLocation;
                  // const file = new Blob([updatedModel], { type: "text/html" });
                  // console.log(file);
                  // await apiService.uploadDocument(file, "clientId", "clientName");
                },
              },
            }}
          />
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
                  console.log(
                    `Rejected recommendation ${activeRecommendation === index}`
                  )
                }
                onCoverTap={() => setActiveRecommendation(index)}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default FunctionalEditor;
