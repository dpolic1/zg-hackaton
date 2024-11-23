
export async function setUpScriptForAPI (setIsLoaded: (arg0: boolean) => void) {
  if (window.google && window.google.maps) {
    setIsLoaded(true); // If loaded, update state and exit
    return;
  }
  const existingScript = document.querySelector(
    'script[src*="maps.googleapis.com"]'
  );
  if (existingScript) {
    existingScript.addEventListener("load", () => setIsLoaded(true));
    return;
  }

  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB5p476Apq41dAgr2zCIlNue2RQCXSaXws&libraries=geometry,drawing`;
  script.async = true;
  script.defer = true;
  script.onload = () => setIsLoaded(true);
  script.onerror = () => console.error("Failed to load Google Maps API");

  document.body.appendChild(script);
};
