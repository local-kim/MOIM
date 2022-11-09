import React, { useCallback, useMemo, useRef, useState } from 'react';
import Tags from "@yaireo/tagify/dist/react.tagify"; // React-wrapper file
import "@yaireo/tagify/dist/tagify.css"; // Tagify CSS
import './Hashtags.css';
// import DragSort from '@yaireo/dragsort'
// import '@yaireo/dragsort/dist/dragsort.css'

// A React component for a tagify "tag"
// const Tag = ({props: [tagData, tagify]}) => (
//   <tag title={tagData.title || tagData.value}
//       contenteditable='false'
//       spellcheck='false'
//       tabIndex={tagify.settings.a11y.focusableTags ? 0 : -1}
//       class={`${tagify.settings.classNames.tag} ${tagData.class ? tagData.class : ""}`}
//       { ...tagify.getCustomAttributes(tagData) }
//     >
//     <x title='' class={tagify.settings.classNames.tagX} role='button' aria-label='remove tag'></x>
//     <div>
//       <span class={tagify.settings.classNames.tagText}>{tagData[tagify.settings.tagTextProp] || tagData.value}</span>
//     </div>
//   </tag>
// )

// Tagify settings object
// const baseTagifySettings = {
//   blacklist: ["xxx", "yyy", "zzz"],
//   maxTags: 6,
//   //backspace: "edit",
//   placeholder: "type something",
//   dropdown: {
//     enabled: 0 // a;ways show suggestions dropdown
//   }
// }

const Hashtags = ({setTags}) => {
  let tagifySettings = {
    // blacklist: ["xxx", "yyy", "zzz"],
    maxTags: 6,
    backspace: "false",
    // addTagOnBlur: false,
    placeholder: "#",
    // dropdown: {
    //   enabled: 0 // a;ways show suggestions dropdown
    // }
  };

  // // lets set here any of Tagify settings
  // let state = {};

  // const componentDidMount = () => {
  //   // simulate netword delay
  //   setTimeout(() => {
  //     // do some ajax, get whitelist array of all allowed tags, then set it onto the State
  //     // set "showDropdown" to some value, which will filter the dropdown by that value
  //     const whitelistFromServer = [
  //       "aaa",
  //       "aaa1",
  //       "aaa2",
  //       "aaa3",
  //       "bbb1",
  //       "bbb2",
  //       "bbb3",
  //       "bbb4"
  //     ];
  //     this.setState({ whitelist: whitelistFromServer, showDropdown: "a" });
  //   }, 2000);

  //   // simulated "ajax" delay
  //   setTimeout(() => {
  //     // get last added tags, then set it onto the State
  //     const currentTagsFromServer = ["foo", "bar", "baz"];
  //     this.setState({ value: currentTagsFromServer });
  //   }, 1500);

  //   // simulated state change where some tags were deleted
  //   setTimeout(() => {
  //     this.setState({ value: ["bar"] });
  //   }, 5000);
  // }

  // const callback = (e) => {
  //   console.log(`%c ${e.type}: `, "background: #222; color: #bada55", e.detail);
  // };

  // // callbacks props (for this demo, the same callback reference is assigned to every event type)
  // let mapTagifyCallbacks = {
  //   add: callback,
  //   remove: callback,
  //   input: callback,
  //   edit: callback,
  //   invalid: callback,
  //   click: callback
  // };

  // // merged tagify settings (static & dynamic)
  // let settings = {
  //   ...tagifySettings,
  //   callbacks: mapTagifyCallbacks,
  //   whitelist: state.whitelist || []
  // };

  // // initial value
  // const { value, showDropdown } = state;

  // const [tags, setTags] = useState([]);

  // on tag add/edit/remove
  const onChange = useCallback((e) => {
    setTags(e.detail.tagify.value);
    console.log(
      e.detail.tagify.value // Array where each tag includes tagify's (needed) extra properties
      // , e.detail.tagify.getCleanValue() // Same as above, without the extra properties
      // , e.detail.value // a string representing the tags
    );
  }, [])

  // const tagifyRef = useRef();

  // const tagifyRefDragSort = useRef();

  // useMemo(() => {
  //   if(  tagifyRefDragSort.current )
  //     new DragSort(tagifyRefDragSort.current.DOM.scope, {
  //       selector: '.tagify__tag',
  //       callbacks: {
  //           dragEnd: onDragEnd
  //       }
  //     })
  // }, [tagifyRefDragSort.current])

  // // must update Tagify's value according to the re-ordered nodes in the DOM
  // function onDragEnd(elm){
  //   tagifyRefDragSort.current.updateValueByDOMTags()
  // }

  return (
    // <Tags
    //   mode="textarea"
    //   settings={settings}
    //   // value={value}
    //   showDropdown={showDropdown}
    // />
    <Tags className={`custom_tag`}
      settings={tagifySettings}
      // tagifyRef={tagifyRef} // optional Ref object for the Tagify instance itself, to get access to  inner-methods
      // settings={settings}  // tagify settings object
      // settings={{
      //   templates: {
      //     tag: Tag
      //   }
      // }}
      // defaultValue="a,b,c"
      // {...tagifyProps}   // dynamic props such as "loading", "showDropdown:'abc'", "value"
      onChange={onChange}
    />
    // <Tags 
    //   tagifyRef={tagifyRefDragSort}
    //   defaultValue="tagify, is , awesome, in so many way"/>
  );
};

export default Hashtags;