
export async function setUpScriptForAPI (setIsLoaded: (isLoaded: boolean) => void) {
  const existingScript = document.querySelector(
    'script[src*="maps.googleapis.com"]'
  );
  if (existingScript) {
    existingScript.addEventListener("load", () => setIsLoaded(true));
    return;
  }

  const script = document.createElement("script");
  script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyB5p476Apq41dAgr2zCIlNue2RQCXSaXws&libraries=geometry,drawing";
  script.async = true;
  script.defer = true;
  script.setAttribute("loading", "async"); // Add the 'loading' attribute
  script.onload = () => {
    console.log("Google Maps API loaded successfully");
    setIsLoaded(true);
  };
  script.onerror = () => {
    console.error("Failed to load Google Maps API");
    setIsLoaded(false);
  };

  document.body.appendChild(script);
};
