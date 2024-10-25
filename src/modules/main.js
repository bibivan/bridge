import Swiper from 'swiper/bundle'
import $ from 'jquery'

// import styles bundle
import 'swiper/css/bundle'

export default () => {
  document.addEventListener('DOMContentLoaded', function () {
    // Check if the browser is Safari
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

    if (isSafari) {
      // / Create and display the GIF
      // const gif = document.createElement('img');
      // gif.src = './videos/sequence.gif'; // Replace with your GIF path
      // document.querySelector('.background_video').appendChild(gif);
      const generateMainSequence = () => {
        for (let i = 1; i <= 361; i++) {
          const sequenceImage = document.createElement('img')

          if (i < 10) {
            sequenceImage.src = `./animation/sequence/animation0000${i}.webp`
          } else if (i >= 10 && i <= 99) {
            sequenceImage.src = `./animation/sequence/animation000${i}.webp`
          } else {
            sequenceImage.src = `./animation/sequence/animation00${i}.webp`
          }

          if (i === 1) {
            sequenceImage.className = 'active animation-' + i
          } else {
            sequenceImage.className = 'animation-' + i
          }
          sequenceImage.loading = 'lazy'

          document.querySelector('.background_video').appendChild(sequenceImage)
        }
      }

      generateMainSequence()

      const startSequenceAnim = () => {
        let currentImage = 1

        if (currentImage <= 361) {
          setInterval(function () {
            $('.background_video img').removeClass('active')
            $('.animation-' + currentImage).addClass('active')
            currentImage++
            if (currentImage === 361) {
              currentImage = 1
            }
          }, 28)
        }
      }

      startSequenceAnim()

      const block = document.querySelector('.animation')
      let bridgeImage
      let isAnimated = false

      const generateBridgeSequence = () => {
        for (let i = 0; i <= 50; i++) {
          bridgeImage = document.createElement('img')
          if (i < 10) {
            bridgeImage.src = `./animation/bridge/bridge00${i}.webp`
            bridgeImage.className = 'bridge-' + i
            if (i === 0) {
              bridgeImage.className = 'active bridge-' + i
            }
          } else {
            bridgeImage.src = `./animation/bridge/bridge0${i}.webp`
            bridgeImage.className = 'bridge-' + i
          }

          bridgeImage.loading = 'lazy'

          document.querySelector('.bridge_video').appendChild(bridgeImage)
        }
      }

      generateBridgeSequence()

      // Function to check if the block is in the viewport
      const isInViewport = () => {
        const blockTop = block.offsetTop // The block's top position relative to the document
        const scrollY = window.scrollY || window.pageYOffset // Current scroll position
        // const windowHeight = window.innerHeight // Height of the viewport
        return scrollY > blockTop // Check if the block is in the viewport
      }
      // Function to append the GIF when the block is in view
      const checkAndStartAnim = () => {
        let currentImage = 1

        if (isInViewport() && !isAnimated) {
          if (currentImage <= 50) {
            setInterval(function () {
              if (currentImage <= 50) {
                $('.bridge_video img').removeClass('active')
              }
              $('.bridge-' + currentImage).addClass('active')
              currentImage++
            }, 50)
          }

          isAnimated = true
        }
      }

      // Listen for the scroll event to check when the block enters the viewport
      window.addEventListener('scroll', checkAndStartAnim)
    } else {
      // Create and display the video
      const video = document.createElement('video')
      video.autoplay = true
      video.muted = true
      video.loop = true
      video.playsinline = true

      const sourceWebM = document.createElement('source')
      sourceWebM.src = 'videos/sequence.webm' // Replace with your WebM path
      sourceWebM.type = 'video/webm'

      video.appendChild(sourceWebM)
      document.querySelector('.background_video').appendChild(video)

      // Create and display the video
      const bridgeVideo = document.createElement('video')
      bridgeVideo.autoplay = false // Autoplay is disabled; we will manually trigger it
      bridgeVideo.muted = true // Ensure the video is muted (autoplay restriction workaround)
      bridgeVideo.loop = false
      bridgeVideo.playsinline = true
      bridgeVideo.id = 'normal' // Add ID for future reference

      const bridgeSourceWebM = document.createElement('source')
      bridgeSourceWebM.src = './videos/bridge.webm' // Replace with your WebM path
      bridgeSourceWebM.type = 'video/webm'

      bridgeVideo.appendChild(bridgeSourceWebM)
      document.querySelector('.bridge_video').appendChild(bridgeVideo)

      // Get the normal video element
      const normalVideo = document.getElementById('normal')

      // Get the absolute position of the video block
      const block = document.querySelector('.animation') // Assuming this is the block to track
      const blockTop = block.getBoundingClientRect().top + window.pageYOffset

      let videoPlayed = false // Flag to track if the video has already been played

      // Listen for scroll events
      window.addEventListener('scroll', function () {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop

        // Check if the user has scrolled down to the block and the video hasn't played yet
        if (!videoPlayed && currentScrollTop >= blockTop - 200) {
          normalVideo.play() // Manually play the video when the user reaches the block
          videoPlayed = true // Set the flag to prevent future plays
        }
      })
    }

    let textarea = document.querySelector('.textarea')
    if (textarea) {
      textarea.addEventListener('input', function () {
        this.style.height = 'auto'
        this.style.height = `${this.scrollHeight}px`
      })
    }

    // Function to initialize or reinitialize Swiper
    const initializeSwiper = () => {
      // Function to handle starting and stopping Swiper autoplay
      const handleAutoplay = (swiperInstance, inView) => {
        if (inView) {
          swiperInstance.autoplay.start() // Start autoplay when in viewport
        } else {
          swiperInstance.autoplay.stop() // Stop autoplay when out of viewport
        }
      }

      // Initialize intersection observer
      const createObserver = (element, swiperInstance) => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              handleAutoplay(swiperInstance, entry.isIntersecting)
            })
          },
          { threshold: 0.5 }
        ) // Trigger when at least 50% of the element is visible

        observer.observe(element)
      }

      if (window.innerWidth < 768) {
        $('.why_we_block').addClass('swiper')
        $('.why_we_block .row').addClass('swiper-wrapper')
        $('.why_we_block .why_item').addClass('swiper-slide')

        $('.services_block').addClass('swiper')
        $('.services_block .service_row').addClass('swiper-wrapper')
        $('.services_block .service_item').addClass('swiper-slide')

        // Initialize Swiper for .why_we_block if not already initialized
        let whyWeSwiper
        if (!document.querySelector('.why_we_block').swiper) {
          whyWeSwiper = new Swiper('.why_we_block', {
            autoplay: {
              delay: 3000, // 3 seconds delay
              disableOnInteraction: false
            },
            loop: true,
            slidesPerView: 1,
            spaceBetween: '100%',
            pagination: {
              el: '.swiper-pagination',
              clickable: true
            }
          })
          createObserver(document.querySelector('.why_we_block'), whyWeSwiper)
        }

        // Initialize Swiper for .services_block if not already initialized
        let servicesSwiper
        if (!document.querySelector('.services_block').swiper) {
          servicesSwiper = new Swiper('.services_block', {
            autoplay: {
              delay: 3000, // 3 seconds delay
              disableOnInteraction: false
            },
            loop: true,
            slidesPerView: 1,
            spaceBetween: '100%',
            pagination: {
              el: '.swiper-pagination',
              clickable: true
            }
          })
          createObserver(document.querySelector('.services_block'), servicesSwiper)
        }
      } else {
        // Remove Swiper classes and destroy instances for larger screen sizes
        $('.why_we_block').removeClass('swiper')
        $('.why_we_block .row').removeClass('swiper-wrapper')
        $('.why_we_block .why_item').removeClass('swiper-slide')
        const whyWeSwiperInstance = document.querySelector('.why_we_block').swiper
        if (whyWeSwiperInstance) whyWeSwiperInstance.destroy(true, true)

        $('.services_block').removeClass('swiper')
        $('.services_block .service_row').removeClass('swiper-wrapper')
        $('.services_block .service_item').removeClass('swiper-slide')
        const servicesSwiperInstance = document.querySelector('.services_block').swiper
        if (servicesSwiperInstance) servicesSwiperInstance.destroy(true, true)
      }
    }

    // Reinitialize Swiper on window resize
    window.addEventListener('resize', function () {
      initializeSwiper()
    })

    initializeSwiper()
  })
}
