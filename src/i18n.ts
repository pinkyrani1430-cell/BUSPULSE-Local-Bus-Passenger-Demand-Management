import { Language } from './types';

export interface Translations {
  appName: string;
  appTagline: string;
  appBadge: string;
  navPassenger: string;
  navOperator: string;
  navAbout: string;
  rolePassenger: string;
  roleOperator: string;
  switchRole: string;
  languageSelect: string;
  
  // Passenger Form
  bookJourneyTitle: string;
  bookJourneyDesc: string;
  selectBus: string;
  selectBusPlaceholder: string;
  boardingStop: string;
  boardingStopPlaceholder: string;
  destinationStop: string;
  destinationStopPlaceholder: string;
  passengerCount: string;
  passengerName: string;
  confirmJourneyBtn: string;
  submitting: string;
  journeyConfirmed: string;
  bookingSuccessMsg: string;
  ticketTitle: string;
  fareEstimate: string;
  from: string;
  to: string;
  passengers: string;
  bus: string;
  date: string;
  ticketId: string;
  recentBookings: string;
  noBookingsYet: string;
  cancelJourney: string;
  cancelled: string;
  errorSelectStops: string;
  errorSameStops: string;
  errorReverseDirection: string;
  errorFillAll: string;
  
  // Operator Dashboard
  operatorDashboardTitle: string;
  operatorDashboardDesc: string;
  selectRoute: string;
  busCapacity: string;
  currentPeakDemand: string;
  peakStop: string;
  totalJourneys: string;
  totalPassengersMoved: string;
  demandForecastTitle: string;
  demandForecastDesc: string;
  stopSequence: string;
  stopName: string;
  expectedPassengers: string;
  boarding: string;
  alighting: string;
  capacityBar: string;
  status: string;
  
  // Status Labels
  statusLow: string;
  statusNormal: string;
  statusHigh: string;
  statusFull: string;
  
  // Operator Decision Guidance
  decisionSupportTitle: string;
  decisionSupportBadge: string;
  recUnderutilized: string;
  recOptimal: string;
  recModerate: string;
  recOvercrowded: string;
  actionAdvice: string;
  
  // Controls & Demo Helpers
  activeJourneysList: string;
  noActiveJourneys: string;
  seedDemoDataBtn: string;
  resetDataBtn: string;
  quickTestModalTitle: string;
  quickBookHelp: string;
  loadExampleDemand: string;
  exampleLoadedNotice: string;
  dataResetNotice: string;
  
  // About & Decision Support explanation
  aboutTitle: string;
  aboutP1: string;
  aboutP2: string;
  aboutP3: string;
  close: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: 'BusPulse',
    appTagline: 'Local Bus Passenger-Demand Management',
    appBadge: 'Decision Support Only',
    navPassenger: 'Passenger Booking',
    navOperator: 'Operator Dashboard',
    navAbout: 'How It Works',
    rolePassenger: 'Passenger',
    roleOperator: 'Bus Operator',
    switchRole: 'Switch Role',
    languageSelect: 'Language',
    
    bookJourneyTitle: 'Plan & Record Your Bus Journey',
    bookJourneyDesc: 'Help local transit balance bus occupancy by logging your trip in advance.',
    selectBus: 'Select Bus Route',
    selectBusPlaceholder: '-- Choose a bus route --',
    boardingStop: 'Boarding Stop (From)',
    boardingStopPlaceholder: '-- Select boarding stop --',
    destinationStop: 'Destination Stop (To)',
    destinationStopPlaceholder: '-- Select destination stop --',
    passengerCount: 'Number of Passengers',
    passengerName: 'Passenger / Contact Name',
    confirmJourneyBtn: 'Confirm Journey',
    submitting: 'Saving Journey...',
    journeyConfirmed: 'Journey Confirmed!',
    bookingSuccessMsg: 'Your journey has been recorded in the demand management system.',
    ticketTitle: 'Bus Journey Pass',
    fareEstimate: 'Estimated Fare',
    from: 'From',
    to: 'To',
    passengers: 'Passengers',
    bus: 'Bus',
    date: 'Date & Time',
    ticketId: 'Trip ID',
    recentBookings: 'Your Recent Bookings',
    noBookingsYet: 'No bookings made yet. Select a bus and stops above to book!',
    cancelJourney: 'Cancel',
    cancelled: 'Journey Cancelled',
    errorSelectStops: 'Please select both boarding and destination stops.',
    errorSameStops: 'Boarding and destination stops cannot be the same.',
    errorReverseDirection: 'Destination stop must come after the boarding stop on this route.',
    errorFillAll: 'Please fill in all required fields.',
    
    operatorDashboardTitle: 'Route Occupancy & Demand Monitor',
    operatorDashboardDesc: 'Track expected passenger load at every stop to prevent overcrowding and deploy relief buses.',
    selectRoute: 'Select Bus / Route to Inspect',
    busCapacity: 'Bus Capacity',
    currentPeakDemand: 'Peak Expected Load',
    peakStop: 'Highest Demand Stop',
    totalJourneys: 'Active Bookings',
    totalPassengersMoved: 'Total Passenger Legs',
    demandForecastTitle: 'Stop-by-Stop Expected Passenger Count',
    demandForecastDesc: 'Real-time calculation showing passengers staying on board, boarding, and getting off at each stop.',
    stopSequence: 'Stop #',
    stopName: 'Stop Name',
    expectedPassengers: 'Expected On Board',
    boarding: 'Boarding (+)',
    alighting: 'Alighting (-)',
    capacityBar: 'Occupancy Level',
    status: 'Demand Status',
    
    statusLow: 'LOW',
    statusNormal: 'NORMAL',
    statusHigh: 'HIGH',
    statusFull: 'FULL',
    
    decisionSupportTitle: 'Operational Decision Support',
    decisionSupportBadge: 'Guidance Only',
    recUnderutilized: 'Demand is LOW across the route. Bus is operating under 40% capacity. Normal service sufficient.',
    recOptimal: 'Demand is NORMAL and well-balanced. Bus occupancy is within healthy comfort limits (40% - 75%).',
    recModerate: 'Demand is reaching HIGH levels at key transit stops. Monitor closely; bus is above 75% capacity.',
    recOvercrowded: 'OVERCROWDING ALERT: Bus is expected to be FULL (>95% capacity) at peak stops. Consider dispatching a standby relief bus on this route.',
    actionAdvice: 'Recommendation for Fleet Supervisor:',
    
    activeJourneysList: 'Active Passenger Bookings on this Route',
    noActiveJourneys: 'No active passenger journeys booked for this bus yet.',
    seedDemoDataBtn: 'Load Example Scenario (Bus 500)',
    resetDataBtn: 'Reset All Journeys',
    quickTestModalTitle: 'Test Scenarios',
    quickBookHelp: 'Simulate passengers quickly to see stop-by-stop counts update instantly.',
    loadExampleDemand: 'Loaded sample passenger demand (Silk Board → Richmond Circle)!',
    exampleLoadedNotice: 'Demo data loaded successfully.',
    dataResetNotice: 'All journeys reset.',
    
    aboutTitle: 'About BusPulse System',
    aboutP1: 'Sometimes a local bus becomes overcrowded while another bus on the same corridor runs half-empty. BusPulse solves this by aggregating passenger journey intentions before and during trips.',
    aboutP2: 'When passengers record their boarding and destination stops, the system automatically computes cumulative boarding and alighting to calculate expected occupancy at every stop.',
    aboutP3: 'The Operator Dashboard serves as a non-intrusive decision support tool, providing clear visibility (LOW, NORMAL, HIGH, FULL) so supervisors can adjust schedules or run standby buses.',
    close: 'Close',
  },
  
  hi: {
    appName: 'BusPulse (बसपल्स)',
    appTagline: 'स्थानीय बस यात्री मांग प्रबंधन प्रणाली',
    appBadge: 'निर्णय समर्थन प्रणाली',
    navPassenger: 'यात्री बुकिंग',
    navOperator: 'ऑपरेटर डैशबोर्ड',
    navAbout: 'यह कैसे काम करता है',
    rolePassenger: 'यात्री',
    roleOperator: 'बस ऑपरेटर',
    switchRole: 'भूमिका बदलें',
    languageSelect: 'भाषा (Language)',
    
    bookJourneyTitle: 'अपनी बस यात्रा की योजना बनाएं और दर्ज करें',
    bookJourneyDesc: 'यात्रा दर्ज करके बस में भीड़ प्रबंधन में मदद करें।',
    selectBus: 'बस मार्ग चुनें',
    selectBusPlaceholder: '-- बस मार्ग चुनें --',
    boardingStop: 'चढ़ने का स्टॉप (From)',
    boardingStopPlaceholder: '-- चढ़ने का स्टॉप चुनें --',
    destinationStop: 'उतरने का स्टॉप (To)',
    destinationStopPlaceholder: '-- उतरने का स्टॉप चुनें --',
    passengerCount: 'यात्रियों की संख्या',
    passengerName: 'यात्री का नाम',
    confirmJourneyBtn: 'यात्रा की पुष्टि करें',
    submitting: 'सहेजा जा रहा है...',
    journeyConfirmed: 'यात्रा दर्ज हो गई!',
    bookingSuccessMsg: 'आपकी यात्रा मांग प्रबंधन प्रणाली में दर्ज कर दी गई है।',
    ticketTitle: 'बस यात्रा पास',
    fareEstimate: 'अनुमानित किराया',
    from: 'कहाँ से',
    to: 'कहाँ तक',
    passengers: 'यात्री',
    bus: 'बस',
    date: 'दिनांक और समय',
    ticketId: 'यात्रा आईडी',
    recentBookings: 'आपकी हालिया बुकिंग',
    noBookingsYet: 'अभी कोई बुकिंग नहीं है। ऊपर बस और स्टॉप चुनकर यात्रा बुक करें!',
    cancelJourney: 'रद्द करें',
    cancelled: 'यात्रा रद्द की गई',
    errorSelectStops: 'कृपया चढ़ने और उतरने दोनों स्टॉप चुनें।',
    errorSameStops: 'चढ़ने और उतरने का स्टॉप एक ही नहीं हो सकता।',
    errorReverseDirection: 'उतरने का स्टॉप मार्ग में चढ़ने के स्टॉप के बाद होना चाहिए।',
    errorFillAll: 'कृपया सभी आवश्यक फ़ील्ड भरें।',
    
    operatorDashboardTitle: 'मार्ग ऑक्यूपेंसी एवं मांग मॉनिटर',
    operatorDashboardDesc: 'हर स्टॉप पर संभावित भीड़ देखें और समय पर अतिरिक्त बस चलाने का निर्णय लें।',
    selectRoute: 'निरीक्षण के लिए बस / मार्ग चुनें',
    busCapacity: 'बस क्षमता',
    currentPeakDemand: 'अधिकतम अनुमानित भीड़',
    peakStop: 'सबसे अधिक मांग वाला स्टॉप',
    totalJourneys: 'सक्रिय बुकिंग्स',
    totalPassengersMoved: 'कुल यात्री सफर',
    demandForecastTitle: 'स्टॉप-वार अनुमानित यात्री संख्या',
    demandForecastDesc: 'प्रत्येक स्टॉप पर चढ़ने, उतरने और बस में मौजूद कुल यात्रियों की सटीक गणना।',
    stopSequence: 'क्रम #',
    stopName: 'स्टॉप का नाम',
    expectedPassengers: 'बस में अनुमानित यात्री',
    boarding: 'चढ़ने वाले (+)',
    alighting: 'उतरने वाले (-)',
    capacityBar: 'क्षमता स्तर',
    status: 'मांग स्थिति',
    
    statusLow: 'कम (LOW)',
    statusNormal: 'सामान्य (NORMAL)',
    statusHigh: 'अधिक (HIGH)',
    statusFull: 'भरा हुआ (FULL)',
    
    decisionSupportTitle: 'ऑपरेटर निर्णय समर्थन',
    decisionSupportBadge: 'सलाह मात्र',
    recUnderutilized: 'पूरे मार्ग पर मांग कम है (40% से नीचे)। सामान्य सेवा पर्याप्त है।',
    recOptimal: 'मांग सामान्य और संतुलित है। बस क्षमता सुरक्षित स्तर (40% - 75%) पर है।',
    recModerate: 'प्रमुख स्टॉप्स पर मांग अधिक हो रही है (75% से ऊपर)। निगरानी रखें।',
    recOvercrowded: 'अत्यधिक भीड़ चेतावनी: प्रमुख स्टॉप्स पर बस के 95% से अधिक भरने की संभावना है। स्टैंडबाय बस चलाने पर विचार करें।',
    actionAdvice: 'पर्यवेक्षक के लिए परिचालन सलाह:',
    
    activeJourneysList: 'इस मार्ग पर सक्रिय यात्री बुकिंग्स',
    noActiveJourneys: 'इस बस के लिए अभी तक कोई सक्रिय यात्रा दर्ज नहीं है।',
    seedDemoDataBtn: 'नमूना परिदृश्य लोड करें (बस 500)',
    resetDataBtn: 'सभी यात्राएं रीसेट करें',
    quickTestModalTitle: 'परीक्षण परिदृश्य',
    quickBookHelp: 'स्टॉप-वार गणना तुरंत देखने के लिए यात्रियों का अनुकरण करें।',
    loadExampleDemand: 'नमूना डेटा लोड किया गया (सिल्क बोर्ड → रिचमंड सर्कल)!',
    exampleLoadedNotice: 'डेमो डेटा सफलतापूर्वक लोड हुआ।',
    dataResetNotice: 'सभी यात्रा डेटा रीसेट कर दिया गया।',
    
    aboutTitle: 'BusPulse के बारे में',
    aboutP1: 'कभी-कभी एक बस में बहुत ज्यादा भीड़ हो जाती है जबकि उसी मार्ग पर दूसरी बस खाली जाती है। BusPulse इस समस्या को हल करने में मदद करता है।',
    aboutP2: 'जब यात्री अपनी यात्रा दर्ज करते हैं, प्रणाली स्वचालित रूप से हर स्टॉप पर कुल यात्रियों की संख्या की गणना करती है।',
    aboutP3: 'ऑपरेटर डैशबोर्ड केवल निर्णय समर्थन के लिए है, जिससे डिपो सुपरवाइज़र सही समय पर सही फैसला ले सकें।',
    close: 'बंद करें',
  },
  
  kn: {
    appName: 'BusPulse (ಬಸ್‌ಪಲ್ಸ್)',
    appTagline: 'ಸ್ಥಳೀಯ ಬಸ್ ಪ್ರಯಾಣಿಕರ ಬೇಡಿಕೆ ನಿರ್ವಹಣಾ ವ್ಯವಸ್ಥೆ',
    appBadge: 'ನಿರ್ಧಾರ ಬೆಂಬಲ ವ್ಯವಸ್ಥೆ',
    navPassenger: 'ಪ್ರಯಾಣಿಕರ ಬುಕಿಂಗ್',
    navOperator: 'ನಿರ್ವಾಹಕರ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    navAbout: 'ಇದು ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ',
    rolePassenger: 'ಪ್ರಯಾಣಿಕರು',
    roleOperator: 'ಬಸ್ ನಿರ್ವಾಹಕರು',
    switchRole: 'ಪಾತ್ರ ಬದಲಾಯಿಸಿ',
    languageSelect: 'ಭಾಷೆ (Language)',
    
    bookJourneyTitle: 'ನಿಮ್ಮ ಬಸ್ ಪ್ರಯಾಣವನ್ನು ಯೋಜಿಸಿ ಮತ್ತು ನೋಂದಾಯಿಸಿ',
    bookJourneyDesc: 'ಮುಂಚಿತವಾಗಿ ಪ್ರಯಾಣ ನೋಂದಾಯಿಸುವ ಮೂಲಕ ಬಸ್ ದಟ್ಟಣೆ ನಿರ್ವಹಣೆಗೆ ಸಹಕರಿಸಿ.',
    selectBus: 'ಬಸ್ ಮಾರ್ಗ ಆಯ್ಕೆಮಾಡಿ',
    selectBusPlaceholder: '-- ಬಸ್ ಮಾರ್ಗವನ್ನು ಆರಿಸಿ --',
    boardingStop: 'ಹತ್ತುವ ನಿಲ್ದಾಣ (From)',
    boardingStopPlaceholder: '-- ಹತ್ತುವ ನಿಲ್ದಾಣ ಆಯ್ಕೆಮಾಡಿ --',
    destinationStop: 'ಇಳಿಯುವ ನಿಲ್ದಾಣ (To)',
    destinationStopPlaceholder: '-- ಇಳಿಯುವ ನಿಲ್ದಾಣ ಆಯ್ಕೆಮಾಡಿ --',
    passengerCount: 'ಪ್ರಯಾಣಿಕರ ಸಂಖ್ಯೆ',
    passengerName: 'ಪ್ರಯಾಣಿಕರ ಹೆಸರು',
    confirmJourneyBtn: 'ಪ್ರಯಾಣ ದೃಢೀಕರಿಸಿ',
    submitting: 'ಉಳಿಸಲಾಗುತ್ತಿದೆ...',
    journeyConfirmed: 'ಪ್ರಯಾಣ ದೃಢೀಕರಿಸಲಾಗಿದೆ!',
    bookingSuccessMsg: 'ನಿಮ್ಮ ಪ್ರಯಾಣ ವಿವರಗಳು ಬೇಡಿಕೆ ನಿರ್ವಹಣಾ ವ್ಯವಸ್ಥೆಯಲ್ಲಿ ದಾಖಲಾಗಿವೆ.',
    ticketTitle: 'ಬಸ್ ಪ್ರಯಾಣ ಪಾಸ್',
    fareEstimate: 'ಅಂದಾಜು ದರ',
    from: 'ಇಲ್ಲಿಂದ',
    to: 'ಇಲ್ಲಿಗೆ',
    passengers: 'ಪ್ರಯಾಣಿಕರು',
    bus: 'ಬಸ್',
    date: 'ದಿನಾಂಕ ಮತ್ತು ಸಮಯ',
    ticketId: 'ಪ್ರಯಾಣ ಐಡಿ',
    recentBookings: 'ನಿಮ್ಮ ಇತ್ತೀಚಿನ ಬುಕಿಂಗ್‌ಗಳು',
    noBookingsYet: 'ಇನ್ನೂ ಯಾವುದೇ ಬುಕಿಂಗ್ ಮಾಡಲಾಗಿಲ್ಲ. ಮೇಲೆ ಬಸ್ ಮತ್ತು ನಿಲ್ದಾಣಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ!',
    cancelJourney: 'ರದ್ದುಮಾಡಿ',
    cancelled: 'ಪ್ರಯಾಣ ರದ್ದುಗೊಂಡಿದೆ',
    errorSelectStops: 'ದಯವಿಟ್ಟು ಹತ್ತುವ ಮತ್ತು ಇಳಿಯುವ ನಿಲ್ದಾಣಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ.',
    errorSameStops: 'ಹತ್ತುವ ಮತ್ತು ಇಳಿಯುವ ನಿಲ್ದಾಣ ಒಂದೇ ಆಗಿರಬಾರದು.',
    errorReverseDirection: 'ಇಳಿಯುವ ನಿಲ್ದಾಣವು ಹತ್ತುವ ನಿಲ್ದಾಣದ ನಂತರ ಬರಬೇಕು.',
    errorFillAll: 'ದಯವಿಟ್ಟು ಅಗತ್ಯವಿರುವ ಎಲ್ಲಾ ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ.',
    
    operatorDashboardTitle: 'ಮಾರ್ಗ ಪ್ರಯಾಣಿಕರ ಸಾಂದ್ರತೆ ಮತ್ತು ಬೇಡಿಕೆ ಮಾನಿಟರ್',
    operatorDashboardDesc: 'ಪ್ರತಿ ನಿಲ್ದಾಣದಲ್ಲಿ ಪ್ರಯಾಣಿಕರ ದಟ್ಟಣೆಯನ್ನು ಮೊದಲೇ ತಿಳಿದುಕೊಂಡು ಸೂಕ್ತ ನಿರ್ಧಾರಗಳನ್ನು ಕೈಗೊಳ್ಳಿ.',
    selectRoute: 'ಪರಿಶೀಲಿಸಲು ಬಸ್ / ಮಾರ್ಗ ಆರಿಸಿ',
    busCapacity: 'ಬಸ್ ಸಾಮರ್ಥ್ಯ',
    currentPeakDemand: 'ಗರಿಷ್ಠ ನಿರೀಕ್ಷಿತ ದಟ್ಟಣೆ',
    peakStop: 'ಅತಿ ಹೆಚ್ಚು ಬೇಡಿಕೆಯ ನಿಲ್ದಾಣ',
    totalJourneys: 'ಸಕ್ರಿಯ ಬುಕಿಂಗ್‌ಗಳು',
    totalPassengersMoved: 'ಒಟ್ಟು ಪ್ರಯಾಣಿಕರ ಹಂತಗಳು',
    demandForecastTitle: 'ನಿಲ್ದಾಣವಾರು ನಿರೀಕ್ಷಿತ ಪ್ರಯಾಣಿಕರ ಸಂಖ್ಯೆ',
    demandForecastDesc: 'ಪ್ರತಿ ನಿಲ್ದಾಣದಲ್ಲಿ ಬಸ್ ಹತ್ತುವ, ಇಳಿಯುವ ಮತ್ತು ಬಸ್‌ನಲ್ಲಿ ಉಳಿಯುವ ಪ್ರಯಾಣಿಕರ ನಿಖರ ಲೆಕ್ಕಾಚಾರ.',
    stopSequence: 'ಕ್ರ.ಸಂ.',
    stopName: 'ನಿಲ್ದಾಣದ ಹೆಸರು',
    expectedPassengers: 'ಬಸ್‌ನಲ್ಲಿ ನಿರೀಕ್ಷಿತ ಪ್ರಯಾಣಿಕರು',
    boarding: 'ಹತ್ತುವವರು (+)',
    alighting: 'ಇಳಿಯುವವರು (-)',
    capacityBar: 'ಸಾಮರ್ಥ್ಯ ಮಟ್ಟ',
    status: 'ಬೇಡಿಕೆ ಸ್ಥಿತಿ',
    
    statusLow: 'ಕಡಿಮೆ (LOW)',
    statusNormal: 'ಸಾಮಾನ್ಯ (NORMAL)',
    statusHigh: 'ಹೆಚ್ಚು (HIGH)',
    statusFull: 'ಪೂರ್ಣ (FULL)',
    
    decisionSupportTitle: 'ಕಾರ್ಯಾಚರಣೆ ನಿರ್ಧಾರ ಬೆಂಬಲ',
    decisionSupportBadge: 'ಮಾರ್ಗದರ್ಶನ ಮಾತ್ರ',
    recUnderutilized: 'ಮಾರ್ಗದುದ್ದಕ್ಕೂ ಬೇಡಿಕೆ ಕಡಿಮೆಯಾಗಿದೆ (40% ಕ್ಕಿಂತ ಕಡಿಮೆ). ಸಾಮಾನ್ಯ ಸೇವೆ ಸಾಕಾಗುತ್ತದೆ.',
    recOptimal: 'ಬೇಡಿಕೆ ಸಾಮಾನ್ಯ ಮತ್ತು ಸಮತೋಲಿತವಾಗಿದೆ. ಪ್ರಯಾಣಿಕರ ಪ್ರಮಾಣ ಸುರಕ್ಷಿತ ಮಿತಿಯಲ್ಲಿದೆ (40% - 75%).',
    recModerate: 'ಪ್ರಮುಖ ನಿಲ್ದಾಣಗಳಲ್ಲಿ ಬೇಡಿಕೆ ಹೆಚ್ಚಾಗುತ್ತಿದೆ (75% ಕ್ಕಿಂತ ಹೆಚ್ಚು). ಗಮನವಿರಲಿ.',
    recOvercrowded: 'ಅತಿಯಾದ ದಟ್ಟಣೆ ಎಚ್ಚರಿಕೆ: ಪ್ರಮುಖ ನಿಲ್ದಾಣಗಳಲ್ಲಿ ಬಸ್ ತುಂಬುವ (95% ಕ್ಕಿಂತ ಹೆಚ್ಚು) ಸಾಧ್ಯತೆಯಿದೆ. ಹೆಚ್ಚುವರಿ ಬಸ್ ನಿಯೋಜಿಸಲು ಪರಿಗಣಿಸಿ.',
    actionAdvice: 'ಮೇಲ್ವಿಚಾರಕರಿಗೆ ಶಿಫಾರಸು:',
    
    activeJourneysList: 'ಈ ಮಾರ್ಗದ ಸಕ್ರಿಯ ಪ್ರಯಾಣಿಕರ ಬುಕಿಂಗ್‌ಗಳು',
    noActiveJourneys: 'ಈ ಬಸ್‌ಗೆ ಇನ್ನೂ ಯಾವುದೇ ಸಕ್ರಿಯ ಪ್ರಯಾಣಗಳು ದಾಖಲಾಗಿಲ್ಲ.',
    seedDemoDataBtn: 'ಮಾದರಿ ಡೇಟಾ ಲೋಡ್ ಮಾಡಿ (ಬಸ್ 500)',
    resetDataBtn: 'ಎಲ್ಲಾ ಪ್ರಯಾಣಗಳನ್ನು ಮರುಹೊಂದಿಸಿ',
    quickTestModalTitle: 'ಪರೀಕ್ಷಾ ಸನ್ನಿವೇಶಗಳು',
    quickBookHelp: 'ಪ್ರತಿ ನಿಲ್ದಾಣದ ಎಣಿಕೆಗಳನ್ನು ತಕ್ಷಣ ನೋಡಲು ಪ್ರಯಾಣಿಕರ ಪ್ರಯಾಣಗಳನ್ನು ಅನುಕರಿಸಿ.',
    loadExampleDemand: 'ಮಾದರಿ ಡೇಟಾ ಲೋಡ್ ಆಗಿದೆ (ಸಿಲ್ಕ್ ಬೋರ್ಡ್ → ರಿಚ್ಮಂಡ್ ಸರ್ಕಲ್)!',
    exampleLoadedNotice: 'ಮಾದರಿ ಡೇಟಾ ಯಶಸ್ವಿಯಾಗಿ ಲೋಡ್ ಆಗಿದೆ.',
    dataResetNotice: 'ಎಲ್ಲಾ ಪ್ರಯಾಣ ಡೇಟಾ ಮರುಹೊಂದಿಸಲಾಗಿದೆ.',
    
    aboutTitle: 'ಬಸ್‌ಪಲ್ಸ್ ಬಗ್ಗೆ',
    aboutP1: 'ಕೆಲವೊಮ್ಮೆ ಒಂದೇ ಮಾರ್ಗದಲ್ಲಿ ಒಂದು ಬಸ್‌ನಲ್ಲಿ ಅತಿಯಾದ ಜನದಟ್ಟಣೆ ಇರುತ್ತದೆ, ಇನ್ನೊಂದು ಬಸ್ ಖಾಲಿ ಹೋಗುತ್ತದೆ. ಬಸ್‌ಪಲ್ಸ್ ಈ ಸಮಸ್ಯೆಗೆ ಪರಿಹಾರ ನೀಡುತ್ತದೆ.',
    aboutP2: 'ಪ್ರಯಾಣಿಕರು ತಮ್ಮ ಪ್ರಯಾಣವನ್ನು ನೋಂದಾಯಿಸಿದಾಗ, ವ್ಯವಸ್ಥೆಯು ಪ್ರತಿ ನಿಲ್ದಾಣದಲ್ಲಿ ಎಷ್ಟು ಜನರು ಬಸ್‌ನಲ್ಲಿರುತ್ತಾರೆ ಎಂಬುದನ್ನು ಲೆಕ್ಕಾಚಾರ ಮಾಡುತ್ತದೆ.',
    aboutP3: 'ನಿರ್ವಾಹಕರ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಕೇವಲ ನಿರ್ಧಾರ ಬೆಂಬಲ ಸಾಧನವಾಗಿದ್ದು, ಅಧಿಕಾರಿಗಳಿಗೆ ಅಗತ್ಯವಿದ್ದಾಗ ಸೂಕ್ತ ಕ್ರಮ ಕೈಗೊಳ್ಳಲು ನೆರವಾಗುತ್ತದೆ.',
    close: 'ಮುಚ್ಚಿ',
  },
};
