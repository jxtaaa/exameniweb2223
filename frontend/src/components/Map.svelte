<script>
    import L from "leaflet";
    import "leaflet/dist/leaflet.css";
  
    // {coordinates: [lat,long], text, open?}
    export let points = [];
    export let origin = [0, 0];
    export let height = "40vh";
    export let width = undefined;
  
    function setupMap(htmlElement) {
      const map = L.map(htmlElement).setView(origin, 13);
  
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);
  
      points.forEach(({ coordinates, text, open }) => {
        const marker = L.marker(coordinates).addTo(map).bindPopup(text);
        if (open) marker.openPopup();
      });
    }
  </script>
  
  <figure
    use:setupMap
    style:height
    style:width
    class={$$props.class}
    style={$$props.style}
  />
  