(function () {
  function readJsonConfig (id) {
    const element = document.getElementById(id)

    if (!element) {
      return null
    }

    try {
      return JSON.parse(element.textContent)
    } catch (error) {
      console.error('Invalid config for', id, error)
      return null
    }
  }

  const analyticsConfig = readJsonConfig('analytics-config')
  if (analyticsConfig) {
    window.dataLayer = window.dataLayer || []

    function gtag () {
      window.dataLayer.push(arguments)
    }

    window.gtag = window.gtag || gtag
    window.gtag('js', new Date())
    window.gtag('config', analyticsConfig.measurementId, {
      page_path: analyticsConfig.pagePath,
      page_title: analyticsConfig.pageTitle,
      anonymize_ip: true,
      allow_google_signals: true,
      allow_ad_personalization_signals: false
    })

    if (analyticsConfig.trackServicesPage) {
      window.gtag('event', 'view_item', {
        items: [
          { item_id: 'lawn_mowers', item_name: 'Lawn Mower Repair' },
          { item_id: 'small_engines', item_name: 'Small Engine Repair' },
          { item_id: 'snow_equipment', item_name: 'Snow Equipment Repair' }
        ]
      })
    }
  }

  const hotjarConfig = readJsonConfig('hotjar-config')
  if (hotjarConfig && hotjarConfig.id) {
    window.hj = window.hj || function () {
      (window.hj.q = window.hj.q || []).push(arguments)
    }

    window._hjSettings = {
      hjid: hotjarConfig.id,
      hjsv: 6
    }

    const script = document.createElement('script')
    script.async = true
    script.src = 'https://static.hotjar.com/c/hotjar-' + hotjarConfig.id + '.js?sv=6'
    document.head.appendChild(script)
  }
})()