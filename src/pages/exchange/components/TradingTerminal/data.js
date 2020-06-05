export const chartOptions = {
  height: 500,
  localization: {
    dateFormat: 'yyyy MMM dd',
  },
  layout: {
    backgroundColor: '#fff',
    textColor: 'rgba(10, 10, 10, 0.9)',
  },
  grid: {
    vertLines: {
      color: 'rgba(100, 100, 100, 0.5)',
      style: 1,
      visible: true,
    },
    horzLines: {
      color: 'rgba(100, 100, 100, 0.5)',
      style: 1,
      visible: true,
    },
  },
  priceScale: {
    position: 'right',
    mode: 1,
    borderColor: 'rgba(197, 203, 206, 0.8)',
  },
  timeScale: {
    rightOffset: 12,
    barSpacing: 3,
    fixLeftEdge: true,
    lockVisibleTimeRangeOnResize: true,
    rightBarStaysOnScroll: true,
    borderVisible: false,
    borderColor: '#fff000',
    visible: true,
    timeVisible: true,
    secondsVisible: true,
  },
  handleScroll: {
    mouseWheel: true,
    pressedMouseMove: true,
  },
  handleScale: {
    axisPressedMouseMove: true,
    mouseWheel: true,
    pinch: true,
  },
};
