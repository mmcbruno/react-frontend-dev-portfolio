 export const updateFilter= (language, addFilter)=>{
 const langSvg =   document.getElementById(language);
  addFilter ? langSvg.setAttribute("filter", "brightness(40%)"):
                langSvg.removeAttribute("filter", "brightness(40%)");


 }

