
    // Initialize and add the map
    function initMap() {
    // The location of Uluru
    var uluru = {lat: -25.344, lng: 131.036};
    // The map, centered at Uluru
    var map = new google.maps.Map(
    document.getElementById('google-map'), {zoom: 4, center: uluru});
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({position: uluru, map: map});
}
<script async defer
src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBOxu4uYY4Rs0HNXwhpJEH2Q4Mlb-KmlN8&callback=initMap">
</script>