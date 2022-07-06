import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1000}
    height={460}
    viewBox="0 0 1000 460"
    backgroundColor="#ffffff"
    foregroundColor="#e9e7e7"
    {...props}
  >
    <circle cx="39" cy="33" r="17" /> 
    <rect x="22" y="54" rx="2" ry="2" width="401" height="17" /> 
    <rect x="62" y="26" rx="2" ry="2" width="207" height="15" /> 
    <rect x="20" y="80" rx="2" ry="2" width="594" height="324" />
  </ContentLoader>
)

export default MyLoader

