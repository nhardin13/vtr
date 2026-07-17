window.initGoogleMaps = function () {
  void map()
}

function isGoogleMapsReady () {
  return typeof window.google !== 'undefined' &&
    window.google.maps &&
    typeof window.google.maps.Map === 'function' &&
    window.google.maps.ControlPosition &&
    window.google.maps.MapTypeId
}

function getGoogleMapsConfig () {
  const configElement = document.getElementById('google-maps-config')
  if (!configElement) {
    return {}
  }

  try {
    const parsed = JSON.parse(configElement.textContent || '{}')

    // Some template contexts can serialize JSON as a JSON string. Parse twice when needed.
    if (typeof parsed === 'string') {
      return JSON.parse(parsed)
    }

    return parsed
  } catch (error) {
    console.warn('⚠️ Invalid Google Maps config JSON, using defaults')
    return {}
  }
}

$(document).ready(function () {
  if (isGoogleMapsReady()) {
    void map()
  }
})

async function createMapMarker (map, center, image, direction) {
  const maps = window.google.maps

  if (typeof maps.importLibrary === 'function') {
    const markerLibrary = await maps.importLibrary('marker')
    if (markerLibrary && markerLibrary.AdvancedMarkerElement) {
      const markerContent = image
        ? Object.assign(document.createElement('img'), {
            src: image,
            alt: direction || 'Map marker'
          })
        : undefined

      if (markerContent) {
        markerContent.style.width = '32px'
        markerContent.style.height = '32px'
      }

      const marker = new markerLibrary.AdvancedMarkerElement({
        map,
        position: center,
        title: direction,
        content: markerContent
      })

      const handleMarkerClick = function () {
        const url = new URL('https://maps.google.com/')
        url.searchParams.set('daddr', direction)
        window.open(url.href, '_blank', 'noopener,noreferrer')
      }

      if (typeof marker.addEventListener === 'function') {
        marker.addEventListener('gmp-click', handleMarkerClick)
      } else if (typeof marker.addListener === 'function') {
        marker.addListener('gmp-click', handleMarkerClick)
      }

      return marker
    }
  }

  console.warn('⚠️ AdvancedMarkerElement unavailable, skipping marker creation')
  return null
}

async function map () {
  if ($('#map').length) {
    if (!isGoogleMapsReady()) {
      console.warn('⚠️ Google Maps API not available, skipping map initialization')
      return
    }

    if (document.getElementById('map').dataset.initialized === 'true') {
      return
    }
    
    const lat = Number($('#gmap-lat').val())
    const lng = Number($('#gmap-lng').val())
    const direction = $('#gmap-dir').val()
    const image = $('#gmap-marker').val()
    const mapElement = document.getElementById('map')

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      console.warn('⚠️ Invalid map coordinates, skipping map initialization')
      return
    }

    const styles =
      [
        {
          'featureType': 'landscape', 'stylers': [{ 'saturation': -100 }, { 'lightness': 65 }, { 'visibility': 'on' }]
        }, {
          'featureType': 'poi', 'stylers': [{ 'saturation': -100 }, { 'lightness': 51 }, { 'visibility': 'simplified' }]
        }, {
          'featureType': 'road.highway', 'stylers': [{ 'saturation': -100 }, { 'visibility': 'simplified' }]
        }, {
          'featureType': 'road.arterial', 'stylers': [{ 'saturation': -100 }, { 'lightness': 30 }, { 'visibility': 'on' }]
        }, {
          'featureType': 'road.local', 'stylers': [{ 'saturation': -100 }, { 'lightness': 40 }, { 'visibility': 'on' }]
        }, {
          'featureType': 'transit', 'stylers': [{ 'saturation': -100 }, { 'visibility': 'simplified' }]
        }, {
          'featureType': 'administrative.province', 'stylers': [{ 'visibility': 'off' }]
        }, {
          'featureType': 'water', 'elementType': 'labels', 'stylers': [{ 'visibility': 'on' }, { 'lightness': -25 }, { 'saturation': -100 }]
        }, {
          'featureType': 'water', 'elementType': 'geometry', 'stylers': [{ 'hue': '#ffff00' }, { 'lightness': -25 }, { 'saturation': -97 }]
        }
      ]

    const mapsConfig = getGoogleMapsConfig()
    const mapId = typeof mapsConfig.mapId === 'string' && mapsConfig.mapId.trim()
      ? mapsConfig.mapId.trim()
      : undefined
    const center = { lat, lng }
    const mapOptions = {
      center,
      mapId,
      zoomControl: true,
      zoom: 15,
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.TOP_LEFT
      },
      panControl: false,
      streetViewControl: false,
      mapTypeControl: false,
      overviewMapControl: false,
      scrollwheel: false,
      draggable: false,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP
    }

    if (!mapId) {
      mapOptions.styles = styles
    }

    const map = new window.google.maps.Map(mapElement, mapOptions)

    await createMapMarker(map, center, image, direction)

    mapElement.dataset.initialized = 'true'
  }
}
