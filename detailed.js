// Get the query parameters from the URL
const params = new URLSearchParams(window.location.search);

const paramIndex = params.get("index");
const type = params.get("type");

let modelNumberExisting = false; 

// OS Version Mapping for dynamic linking
const OS_VERSION_MAP = {
    // iPhoneOS versions
    'iPhoneOS 1.0': { modelNumber: 'iPhoneOS', type: 'iPhoneOS', displayText: 'iPhoneOS 1.0' },
    'iPhoneOS 1': { modelNumber: 'iPhoneOS', type: 'iPhoneOS', displayText: 'iPhoneOS 1.0' },
    'iPhoneOS 2.0': { modelNumber: 'iPhoneOS 2', type: 'iPhoneOS', displayText: 'iPhoneOS 2.0' },
    'iPhoneOS 2': { modelNumber: 'iPhoneOS 2', type: 'iPhoneOS', displayText: 'iPhoneOS 2.0' },
    'iPhoneOS 3.0': { modelNumber: 'iPhoneOS 3', type: 'iPhoneOS', displayText: 'iPhoneOS 3.0' },
    'iPhoneOS 3': { modelNumber: 'iPhoneOS 3', type: 'iPhoneOS', displayText: 'iPhoneOS 3.0' },
    'iPhoneOS 3.1.3': { modelNumber: 'iPhoneOS 3', type: 'iPhoneOS', displayText: 'iPhoneOS 3.1.3' },
    
    // iOS versions
    'iOS 4.0': { modelNumber: 'iOS 4', type: 'iOS', displayText: 'iOS 4.0' },
    'iOS 4': { modelNumber: 'iOS 4', type: 'iOS', displayText: 'iOS 4.0' },
    'iOS 4.2.1': { modelNumber: 'iOS 4', type: 'iOS', displayText: 'iOS 4.2.1' },
    'iOS 4.2.5': { modelNumber: 'iOS 4', type: 'iOS', displayText: 'iOS 4.2.5' },
    'iOS 5.0': { modelNumber: 'iOS 5', type: 'iOS', displayText: 'iOS 5.0' },
    'iOS 5': { modelNumber: 'iOS 5', type: 'iOS', displayText: 'iOS 5.0' },
    'iOS 6.0': { modelNumber: 'iOS 6', type: 'iOS', displayText: 'iOS 6.0' },
    'iOS 6': { modelNumber: 'iOS 6', type: 'iOS', displayText: 'iOS 6.0' },
    'iOS 6.1.6': { modelNumber: 'iOS 6', type: 'iOS', displayText: 'iOS 6.1.6' },
    'iOS 7.0': { modelNumber: 'iOS 7', type: 'iOS', displayText: 'iOS 7.0' },
    'iOS 7': { modelNumber: 'iOS 7', type: 'iOS', displayText: 'iOS 7.0' },
    'iOS 7.1.2': { modelNumber: 'iOS 7', type: 'iOS', displayText: 'iOS 7.1.2' },
    'iOS 8.0': { modelNumber: 'iOS 8', type: 'iOS', displayText: 'iOS 8.0' },
    'iOS 8': { modelNumber: 'iOS 8', type: 'iOS', displayText: 'iOS 8.0' },
    'iOS 9.0': { modelNumber: 'iOS 9', type: 'iOS', displayText: 'iOS 9.0' },
    'iOS 9': { modelNumber: 'iOS 9', type: 'iOS', displayText: 'iOS 9.0' },
    'iOS 9.3': { modelNumber: 'iOS 9', type: 'iOS', displayText: 'iOS 9.3' },
    'iOS 9.3.6': { modelNumber: 'iOS 9', type: 'iOS', displayText: 'iOS 9.3.6' },
    'iOS 10.0': { modelNumber: 'iOS 10', type: 'iOS', displayText: 'iOS 10.0' },
    'iOS 10': { modelNumber: 'iOS 10', type: 'iOS', displayText: 'iOS 10.0' },
    'iOS 10.3.3': { modelNumber: 'iOS 10', type: 'iOS', displayText: 'iOS 10.3.3' },
    'iOS 10.3.4': { modelNumber: 'iOS 10', type: 'iOS', displayText: 'iOS 10.3.4' },
    'iOS 11.0': { modelNumber: 'iOS 11', type: 'iOS', displayText: 'iOS 11.0' },
    'iOS 11': { modelNumber: 'iOS 11', type: 'iOS', displayText: 'iOS 11.0' },
    'iOS 11.0.1': { modelNumber: 'iOS 11', type: 'iOS', displayText: 'iOS 11.0.1' },
    'iOS 12.0': { modelNumber: 'iOS 12', type: 'iOS', displayText: 'iOS 12.0' },
    'iOS 12': { modelNumber: 'iOS 12', type: 'iOS', displayText: 'iOS 12.0' },
    'iOS 12.5.7': { modelNumber: 'iOS 12', type: 'iOS', displayText: 'iOS 12.5.7' },
    'iOS 13.0': { modelNumber: 'iOS 13', type: 'iOS', displayText: 'iOS 13.0' },
    'iOS 13': { modelNumber: 'iOS 13', type: 'iOS', displayText: 'iOS 13.0' },
    'iOS 14.0': { modelNumber: 'iOS 14', type: 'iOS', displayText: 'iOS 14.0' },
    'iOS 14': { modelNumber: 'iOS 14', type: 'iOS', displayText: 'iOS 14.0' },
    'iOS 15.0': { modelNumber: 'iOS 15', type: 'iOS', displayText: 'iOS 15.0' },
    'iOS 15': { modelNumber: 'iOS 15', type: 'iOS', displayText: 'iOS 15.0' },
    'iOS 16.0': { modelNumber: 'iOS 16', type: 'iOS', displayText: 'iOS 16.0' },
    'iOS 16': { modelNumber: 'iOS 16', type: 'iOS', displayText: 'iOS 16.0' },
    'iOS 17.0': { modelNumber: 'iOS 17', type: 'iOS', displayText: 'iOS 17.0' },
    'iOS 17': { modelNumber: 'iOS 17', type: 'iOS', displayText: 'iOS 17.0' },
    'iOS 18.0': { modelNumber: 'iOS 18', type: 'iOS', displayText: 'iOS 18.0' },
    'iOS 18': { modelNumber: 'iOS 18', type: 'iOS', displayText: 'iOS 18.0' },
    'iOS 26.0': { modelNumber: 'iOS 26', type: 'iOS', displayText: 'iOS 26.0' },
    'iOS 26': { modelNumber: 'iOS 26', type: 'iOS', displayText: 'iOS 26.0' },
    
    // Latest version patterns
    'Latest release of iOS 15': { modelNumber: 'iOS 15', type: 'iOS', displayText: 'Latest release of iOS 15' },
    'Latest release of iOS 16': { modelNumber: 'iOS 16', type: 'iOS', displayText: 'Latest release of iOS 16' },
    'Latest release of iOS 17': { modelNumber: 'iOS 17', type: 'iOS', displayText: 'Latest release of iOS 17' },
    'Latest release of iOS 18': { modelNumber: 'iOS 18', type: 'iOS', displayText: 'Latest release of iOS 18' },
    'Latest release of iOS': { modelNumber: 'iOS 26', type: 'iOS', displayText: 'Latest release of iOS' }
};

// Device Mapping for dynamic linking in Supported Devices
const DEVICE_MODEL_MAP = {
    // iPhone models
    'iPhone': { modelNumber: 'A1203', type: 'iPhone' },
    'iPhone 3G': { modelNumber: 'A1241', type: 'iPhone' },
    'iPhone 3GS': { modelNumber: 'A1303', type: 'iPhone' },
    'iPhone 4': { modelNumber: 'A1332', type: 'iPhone' },
    'iPhone 4S': { modelNumber: 'A1387', type: 'iPhone' },
    'iPhone 4s': { modelNumber: 'A1387', type: 'iPhone' },
    'iPhone 5': { modelNumber: 'A1428', type: 'iPhone' },
    'iPhone 5c': { modelNumber: 'A1532', type: 'iPhone' },
    'iPhone 5s': { modelNumber: 'A1533', type: 'iPhone' },
    'iPhone 6': { modelNumber: 'A1549', type: 'iPhone' },
    'iPhone 6 Plus': { modelNumber: 'A1522', type: 'iPhone' },
    'iPhone 6s': { modelNumber: 'A1633', type: 'iPhone' },
    'iPhone 6s Plus': { modelNumber: 'A1634', type: 'iPhone' },
    'iPhone SE': { modelNumber: 'A1662', type: 'iPhone' },
    'iPhone SE (1st Gen)': { modelNumber: 'A1662', type: 'iPhone' },
    'iPhone SE (2nd Gen)': { modelNumber: 'A2275', type: 'iPhone' },
    'iPhone SE (3rd Gen)': { modelNumber: 'A2595', type: 'iPhone' },
    'iPhone 7': { modelNumber: 'A1660', type: 'iPhone' },
    'iPhone 7 Plus': { modelNumber: 'A1661', type: 'iPhone' },
    'iPhone 8': { modelNumber: 'A1863', type: 'iPhone' },
    'iPhone 8 Plus': { modelNumber: 'A1864', type: 'iPhone' },
    'iPhone X': { modelNumber: 'A1865', type: 'iPhone' },
    'iPhone XR': { modelNumber: 'A1984', type: 'iPhone' },
    'iPhone XS': { modelNumber: 'A1920', type: 'iPhone' },
    'iPhone XS Max': { modelNumber: 'A1921', type: 'iPhone' },
    'iPhone 11': { modelNumber: 'A2111', type: 'iPhone' },
    'iPhone 11 Pro': { modelNumber: 'A2160', type: 'iPhone' },
    'iPhone 11 Pro Max': { modelNumber: 'A2161', type: 'iPhone' },
    'iPhone 12': { modelNumber: 'A2172', type: 'iPhone' },
    'iPhone 12 mini': { modelNumber: 'A2176', type: 'iPhone' },
    'iPhone 12 Pro': { modelNumber: 'A2341', type: 'iPhone' },
    'iPhone 12 Pro Max': { modelNumber: 'A2342', type: 'iPhone' },
    'iPhone 13': { modelNumber: 'A2482', type: 'iPhone' },
    'iPhone 13 mini': { modelNumber: 'A2481', type: 'iPhone' },
    'iPhone 13 Pro': { modelNumber: 'A2483', type: 'iPhone' },
    'iPhone 13 Pro Max': { modelNumber: 'A2484', type: 'iPhone' },
    'iPhone 14': { modelNumber: 'A2649', type: 'iPhone' },
    'iPhone 14 Plus': { modelNumber: 'A2632', type: 'iPhone' },
    'iPhone 14 Pro': { modelNumber: 'A2650', type: 'iPhone' },
    'iPhone 14 Pro Max': { modelNumber: 'A2651', type: 'iPhone' },
    'iPhone 15': { modelNumber: 'A2846', type: 'iPhone' },
    'iPhone 15 Plus': { modelNumber: 'A2847', type: 'iPhone' },
    'iPhone 15 Pro': { modelNumber: 'A2848', type: 'iPhone' },
    'iPhone 15 Pro Max': { modelNumber: 'A2849', type: 'iPhone' },
    'iPhone 16': { modelNumber: 'A3081', type: 'iPhone' },
    'iPhone 16 Plus': { modelNumber: 'A3082', type: 'iPhone' },
    'iPhone 16 Pro': { modelNumber: 'A3083', type: 'iPhone' },
    'iPhone 16 Pro Max': { modelNumber: 'A3084', type: 'iPhone' },
    'iPhone 16e': { modelNumber: 'A3212', type: 'iPhone' },
    'iPhone 17': { modelNumber: 'A3258', type: 'iPhone' },
    'iPhone Air': { modelNumber: 'A3260', type: 'iPhone' },
    'iPhone 17 Pro': { modelNumber: 'A3256', type: 'iPhone' },
    'iPhone 17 Pro Max': { modelNumber: 'A3257', type: 'iPhone' },
    
    // Combined device entries (link to first device for simplicity)
    'iPhone 6 & 6 Plus': { modelNumber: 'A1549', type: 'iPhone' },
    'iPhone 6s & 6s Plus': { modelNumber: 'A1633', type: 'iPhone' },
    
    // iPad models
    'iPad': { modelNumber: 'A1219', type: 'iPad' },
    'iPad (Wi-Fi)': { modelNumber: 'A1219', type: 'iPad' },
    'iPad (Wi-Fi + 3G)': { modelNumber: 'A1337', type: 'iPad' },
    'iPad 2': { modelNumber: 'A1395', type: 'iPad' },
    'iPad (3rd Gen)': { modelNumber: 'A1416', type: 'iPad' },
    'iPad (4th Gen)': { modelNumber: 'A1458', type: 'iPad' },
    'iPad (5th Gen)': { modelNumber: 'A1822', type: 'iPad' },
    'iPad (6th Gen)': { modelNumber: 'A1893', type: 'iPad' },
    'iPad (7th Gen)': { modelNumber: 'A2197', type: 'iPad' },
    'iPad (8th Gen)': { modelNumber: 'A2270', type: 'iPad' },
    'iPad (9th Gen)': { modelNumber: 'A2602', type: 'iPad' },
    'iPad (10th Gen)': { modelNumber: 'A2696', type: 'iPad' },
    'iPad Mini': { modelNumber: 'A1432', type: 'iPad' },
    'iPad Mini (1st Gen)': { modelNumber: 'A1432', type: 'iPad' },
    'iPad Mini 2': { modelNumber: 'A1489', type: 'iPad' },
    'iPad Mini 3': { modelNumber: 'A1599', type: 'iPad' },
    'iPad Mini 4': { modelNumber: 'A1538', type: 'iPad' },
    'iPad Mini (5th Gen)': { modelNumber: 'A2133', type: 'iPad' },
    'iPad Mini (6th Gen)': { modelNumber: 'A2567', type: 'iPad' },
    'iPad Air': { modelNumber: 'A1474', type: 'iPad' },
    'iPad Air (1st Gen)': { modelNumber: 'A1474', type: 'iPad' },
    'iPad Air 2': { modelNumber: 'A1566', type: 'iPad' },
    'iPad Air (3rd Gen)': { modelNumber: 'A2152', type: 'iPad' },
    'iPad Air (4th Gen)': { modelNumber: 'A2316', type: 'iPad' },
    'iPad Air (5th Gen)': { modelNumber: 'A2588', type: 'iPad' },
    'iPad Air M2': { modelNumber: 'A2843', type: 'iPad' },
    'iPad Air M3': { modelNumber: 'A3266', type: 'iPad' },
    'iPad Pro': { modelNumber: 'A1584', type: 'iPad' },
    'iPad Pro (12.9-inch)': { modelNumber: 'A1584', type: 'iPad' },
    'iPad Pro (12.9-inch) (1st Gen)': { modelNumber: 'A1584', type: 'iPad' },
    'iPad Pro (9.7-inch)': { modelNumber: 'A1673', type: 'iPad' },
    'iPad Pro (12.9-inch) (2nd Gen)': { modelNumber: 'A1670', type: 'iPad' },
    'iPad Pro (10.5-inch)': { modelNumber: 'A1701', type: 'iPad' },
    'iPad Pro (11-inch)': { modelNumber: 'A1980', type: 'iPad' },
    'iPad Pro (11-inch) (1st Gen)': { modelNumber: 'A1980', type: 'iPad' },
    'iPad Pro (12.9-inch) (3rd Gen)': { modelNumber: 'A1876', type: 'iPad' },
    'iPad Pro (11-inch) (2nd Gen)': { modelNumber: 'A2068', type: 'iPad' },
    'iPad Pro (12.9-inch) (4th Gen)': { modelNumber: 'A2069', type: 'iPad' },
    'iPad Pro (11-inch) (3rd Gen)': { modelNumber: 'A2377', type: 'iPad' },
    'iPad Pro (12.9-inch) (5th Gen)': { modelNumber: 'A2378', type: 'iPad' },
    'iPad Pro (11-inch) (4th Gen)': { modelNumber: 'A2759', type: 'iPad' },
    'iPad Pro (12.9-inch) (6th Gen)': { modelNumber: 'A2764', type: 'iPad' },
    'iPad Pro (11-inch-M4)': { modelNumber: 'A2836', type: 'iPad' },
    'iPad Pro (13-inch-M4)': { modelNumber: 'A2837', type: 'iPad' },
    'iPad Pro (11-inch-M5)': { modelNumber: 'A3357', type: 'iPad' },
    'iPad Pro (13-inch-M5)': { modelNumber: 'A3360', type: 'iPad' },
    
    // iPod Touch models
    'iPod Touch': { modelNumber: 'A1213', type: 'iPod' },
    'iPod Touch 2G': { modelNumber: 'A1288', type: 'iPod' },
    'iPod Touch (2nd Gen)': { modelNumber: 'A1288', type: 'iPod' },
    'iPod Touch (3rd Gen)': { modelNumber: 'A1318', type: 'iPod' },
    'iPod Touch (4th Gen)': { modelNumber: 'A1367', type: 'iPod' },
    'iPod Touch (5th Gen)': { modelNumber: 'A1421', type: 'iPod' },
    'iPod Touch (6th Gen)': { modelNumber: 'A1574', type: 'iPod' },
    'iPod Touch (7th Gen)': { modelNumber: 'A2178', type: 'iPod' },
    
    // Apple TV models
    'Apple TV': { modelNumber: 'A1218', type: 'AppleTV' },
    'Apple TV (1st Gen)': { modelNumber: 'A1218', type: 'AppleTV' },
    'Apple TV (2nd Gen)': { modelNumber: 'A1378', type: 'AppleTV' },
    'Apple TV (3rd Gen)': { modelNumber: 'A1427', type: 'AppleTV' },
    'Apple TV (4th Gen)': { modelNumber: 'A1625', type: 'AppleTV' },
    'Apple TV 4K': { modelNumber: 'A1842', type: 'AppleTV' },
    'Apple TV 4K (2nd Gen)': { modelNumber: 'A2169', type: 'AppleTV' },
    'Apple TV 4K (3rd Gen)': { modelNumber: 'A2737', type: 'AppleTV' },
    
    // Mac models
    // iMac models
    'iMac G3': { modelNumber: 'M7692', type: 'iMac' },
    'iMac G4': { modelNumber: 'M8893', type: 'iMac' },
    'iMac G5 17-inch': { modelNumber: 'A1058', type: 'iMac' },
    'iMac G5 20-inch': { modelNumber: 'A1076', type: 'iMac' },
    'iMac G5 17-inch (ALS)': { modelNumber: 'A1058 (ALS)', type: 'iMac' },
    'iMac G5 20-inch (ALS)': { modelNumber: 'A1076 (ALS)', type: 'iMac' },
    'iMac G5 17-inch iSight': { modelNumber: 'A1144', type: 'iMac' },
    'iMac G5 20-inch iSight': { modelNumber: 'A1145', type: 'iMac' },
    'iMac (Early 2006) (17-inch)': { modelNumber: 'A1173', type: 'iMac' },
    'iMac Early 2006 20-inch': { modelNumber: 'A1174', type: 'iMac' },
    'iMac (Early 2006) (20-inch)': { modelNumber: 'A1174', type: 'iMac' },
    'iMac (Mid 2006, 17-inch)': { modelNumber: 'A1195 (Mid 2006)', type: 'iMac' },
    'iMac (Mid 2006) (17-inch)': { modelNumber: 'A1195 (Mid 2006)', type: 'iMac' },
    'iMac (Late 2006) (17-inch CD)': { modelNumber: 'A1195', type: 'iMac' },
    'iMac (Late 2006) (17-inch)': { modelNumber: 'A1208', type: 'iMac' },
    'iMac (Late 2006) (20-inch)': { modelNumber: 'A1207', type: 'iMac' },
    'iMac (24-inch)': { modelNumber: 'A1200', type: 'iMac' },
    'iMac (Mid 2007) (20-inch)': { modelNumber: 'A1224', type: 'iMac' },
    'iMac (Mid 2007) (24-inch)': { modelNumber: 'A1225', type: 'iMac' },
    'iMac (Early 2008) (20-inch)': { modelNumber: 'A1224 (Early 2008)', type: 'iMac' },
    'iMac (Early 2008) (24-inch)': { modelNumber: 'A1225 (Early 2008)', type: 'iMac' },
    'iMac (Early 2009) (20-inch)': { modelNumber: 'A1224 (Early 2009)', type: 'iMac' },
    'iMac (Early 2009) (24-inch)': { modelNumber: 'A1225 (Early 2009)', type: 'iMac' },
    'iMac (Mid 2009) (20-inch)': { modelNumber: 'A1224 (Mid 2009)', type: 'iMac' },
    'iMac (21.5-inch, Late 2009)': { modelNumber: 'A1311', type: 'iMac' },
    'iMac (27-inch, Late 2009)': { modelNumber: 'A1312', type: 'iMac' },
    'iMac (21.5-inch, Mid 2010)': { modelNumber: 'A1311 (2010)', type: 'iMac' },
    'iMac (27-inch, Mid 2010)': { modelNumber: 'A1312 (2010)', type: 'iMac' },
    'iMac (21.5-inch, Mid 2011)': { modelNumber: 'A1311 (2011)', type: 'iMac' },
    'iMac (27-inch, Mid 2011)': { modelNumber: 'A1312 (2011)', type: 'iMac' },
    
    // MacBook models
    'MacBook (13-inch)': { modelNumber: 'A1181', type: 'MacBook' },
    'MacBook (13-inch, Late 2006)': { modelNumber: 'A1181 (Late 2006)', type: 'MacBook' },
    'MacBook (13-inch, Mid 2007)': { modelNumber: 'A1181 (Mid 2007)', type: 'MacBook' },
    'MacBook (13-inch, Late 2007)': { modelNumber: 'A1181 (Late 2007)', type: 'MacBook' },
    'MacBook (13-inch, Early 2008)': { modelNumber: 'A1181 (Early 2008)', type: 'MacBook' },
    'MacBook (13-inch, Late 2008)': { modelNumber: 'A1181 (Late 2008)', type: 'MacBook' },
    'MacBook (13-inch, Late 2008) (Aluminum)': { modelNumber: 'A1278 (Late 2008)', type: 'MacBook' },
    'MacBook (13-inch, Early 2009)': { modelNumber: 'A1181 (Early 2009)', type: 'MacBook' },
    'MacBook (13-inch, Mid 2009)': { modelNumber: 'A1181 (Mid 2009)', type: 'MacBook' },
    'MacBook (13-inch, Late 2009)': { modelNumber: 'A1342', type: 'MacBook' },
    'MacBook (13-inch, Mid 2010)': { modelNumber: 'A1342 (Mid 2010)', type: 'MacBook' },
    
    // MacBook Air models
    'MacBook Air': { modelNumber: 'A1237', type: 'MacBook Air' },
    'MacBook Air (Late 2008)': { modelNumber: 'A1304', type: 'MacBook Air' },
    'MacBook Air (Mid 2009)': { modelNumber: 'A1304 (Mid 2009)', type: 'MacBook Air' },
    'MacBook Air (11-inch, Late 2010)': { modelNumber: 'A1370', type: 'MacBook Air' },
    'MacBook Air (13-inch, Late 2010)': { modelNumber: 'A1369', type: 'MacBook Air' },
    
    // MacBook Pro models
    'MacBook Pro (Early 2006)': { modelNumber: 'A1150', type: 'MacBook Pro' },
    'MacBook Pro (17-inch)': { modelNumber: 'A1151', type: 'MacBook Pro' },
    'MacBook Pro (15-inch, Core 2 Duo)': { modelNumber: 'A1211', type: 'MacBook Pro' },
    'MacBook Pro (17-inch, Core 2 Duo)': { modelNumber: 'A1212', type: 'MacBook Pro' },
    'MacBook Pro (15-inch, Mid 2007)': { modelNumber: 'A1226', type: 'MacBook Pro' },
    'MacBook Pro (17-inch, Mid 2007)': { modelNumber: 'A1229', type: 'MacBook Pro' },
    'MacBook Pro (15-inch, Early 2008)': { modelNumber: 'A1260', type: 'MacBook Pro' },
    'MacBook Pro (17-inch, Early 2008)': { modelNumber: 'A1261', type: 'MacBook Pro' },
    'MacBook Pro (15-inch, Late 2008)': { modelNumber: 'A1286', type: 'MacBook Pro' },
    'MacBook Pro (17-inch, Late 2008)': { modelNumber: 'A1261 (Late 2008)', type: 'MacBook Pro' },
    'MacBook Pro (17-inch, Early 2009)': { modelNumber: 'A1297', type: 'MacBook Pro' },
    'MacBook Pro (13-inch, Mid 2009)': { modelNumber: 'A1278', type: 'MacBook Pro' },
    'MacBook Pro (15-inch, 2.53 GHz, Mid 2009)': { modelNumber: 'A1286 (2.53 GHz)', type: 'MacBook Pro' },
    'MacBook Pro (15-inch, Mid 2009)': { modelNumber: 'A1286 (Mid 2009)', type: 'MacBook Pro' },
    'MacBook Pro (17-inch, Mid 2009)': { modelNumber: 'A1297 (Mid 2009)', type: 'MacBook Pro' },
    'MacBook Pro (13-inch, Mid 2010)': { modelNumber: 'A1278 (Mid 2010)', type: 'MacBook Pro' },
    'MacBook Pro (15-inch, Mid 2010)': { modelNumber: 'A1286 (Mid 2010)', type: 'MacBook Pro' },
    'MacBook Pro (17-inch, Mid 2010)': { modelNumber: 'A1297 (Mid 2010)', type: 'MacBook Pro' },
    'MacBook Pro (13-inch, Early 2011)': { modelNumber: 'A1278 (Early 2011)', type: 'MacBook Pro' },
    'MacBook Pro (15-inch, Early 2011)': { modelNumber: 'A1286 (Early 2011)', type: 'MacBook Pro' },
    'MacBook Pro (17-inch, Early 2011)': { modelNumber: 'A1297 (Early 2011)', type: 'MacBook Pro' },
    
    // Mac Mini models
    'Mac Mini': { modelNumber: 'A1103', type: 'MacMini' },
    'Mac Mini (Late 2005)': { modelNumber: 'A1103 (Late 2005)', type: 'MacMini' },
    'Mac Mini (Early 2006)': { modelNumber: 'A1176', type: 'MacMini' },
    'Mac Mini (Late 2006)': { modelNumber: 'A1176 (Late 2006)', type: 'MacMini' },
    'Mac Mini (Mid 2007)': { modelNumber: 'A1176 (Mid 2007)', type: 'MacMini' },
    'Mac Mini (Early 2009)': { modelNumber: 'A1283', type: 'MacMini' },
    'Mac Mini (Late 2009)': { modelNumber: 'A1283 (Late 2009)', type: 'MacMini' },
    'Mac Mini (Mid 2010)': { modelNumber: 'A1347', type: 'MacMini' },
    
    // Mac Pro models
    'Mac Pro': { modelNumber: 'A1186', type: 'Mac Pro' },
    'Mac Pro (8-core)': { modelNumber: 'A1186 (8-Core)', type: 'Mac Pro' },
    'Mac Pro (Early 2008)': { modelNumber: 'A1186 (Early 2008)', type: 'Mac Pro' },
    'Mac Pro (Early 2009)': { modelNumber: 'A1289', type: 'Mac Pro' },
    'Mac Pro (Mid 2010)': { modelNumber: 'A1289 (2010)', type: 'Mac Pro' },
    'Mac Pro (Mid 2012)': { modelNumber: 'A1289 (2012)', type: 'Mac Pro' },
    
    // Xserve models
    'Xserve (Early 2008)': { modelNumber: 'A1246', type: 'Xserve' },
    'Xserve (Early 2009)': { modelNumber: 'A1279', type: 'Xserve' }
};

/**
 * Creates a link for OS versions based on the OS_VERSION_MAP
 * @param {string} osText - The OS text to convert to a link
 * @returns {string} - HTML link or original text if no mapping found
 */
function createOSLink(osText) {
    // Remove any existing HTML tags and get clean text
    const cleanText = osText.replace(/<[^>]*>/g, '').trim();
    
    // Check if we have a mapping for this OS version
    const osMapping = OS_VERSION_MAP[cleanText];
    if (osMapping) {
        const encodedModelNumber = encodeURIComponent(osMapping.modelNumber);
        return `<a class='results-link' href='detailed.html?modelNumber=${encodedModelNumber}&type=${osMapping.type}'>${osMapping.displayText}</a>`;
    }
    
    // Return original text if no mapping found
    return osText;
}

/**
 * Creates device links for Supported Devices lists
 * @param {string} deviceText - The device text to convert to a link
 * @returns {object} - Object with href and text for the device link
 */
function createDeviceLink(deviceText) {
    const cleanText = deviceText.replace(/<[^>]*>/g, '').trim();
    const deviceMapping = DEVICE_MODEL_MAP[cleanText];
    if (deviceMapping) {
        const encodedModelNumber = encodeURIComponent(deviceMapping.modelNumber);
        return {
            href: `detailed.html?modelNumber=${encodedModelNumber}&type=${deviceMapping.type}`,
            text: cleanText
        };
    }
    return { href: null, text: cleanText };
}

/**
 * Converts supported devices from br-separated format to ul list with device links
 * @param {string} devicesText - The devices text (br-separated or already ul format)
 * @returns {string} - HTML ul list with linked devices
 */
function convertSupportedDevicesToLinkedList(devicesText) {
    // If already in ul format, convert existing li elements to have links
    if (devicesText.includes('<ul class=\'supported-devices\'>')) {
        return devicesText.replace(/<li>([^<]+)<\/li>/g, (match, deviceName) => {
            const linkInfo = createDeviceLink(deviceName);
            if (linkInfo.href) {
                return `<li><a href='${linkInfo.href}' class='device-link'>${linkInfo.text}</a></li>`;
            } else {
                return `<li>${linkInfo.text}</li>`;
            }
        });
    }
    
    // Convert from br-separated format
    const devices = devicesText
        .split('<br>')
        .map(device => device.replace(/<[^>]*>/g, '').trim())
        .filter(device => device && device !== '');
    
    if (devices.length === 0) return devicesText;
    
    const linkedDevices = devices.map(device => {
        const linkInfo = createDeviceLink(device);
        if (linkInfo.href) {
            return `<li><a href='${linkInfo.href}' class='device-link'>${linkInfo.text}</a></li>`;
        } else {
            return `<li>${linkInfo.text}</li>`;
        }
    }).join('');
    
    return `<ul class='supported-devices'>${linkedDevices}</ul>`;
}

try {
    let modelNumber = null;

    if (paramIndex !== null) {
        // Handle the case with index and type
        console.error("Invalid usage: 'index' parameter should not be used for a single device.");
    } else {
        // Handle the case with only modelNumber and type
        modelNumber = params.get("modelNumber");

        if (modelNumber !== null) {
            // Now you can use the modelNumber as needed
            console.log("Model Number:", modelNumber);
            modelNumberExisting = true;
        } else {
            console.error("Model Number not found.");
        }
    }
} catch (error) {
    console.error(error);
}

let imgDetail = document.querySelector(".img-detail");

const searchFormNav = document.getElementById("search-form-nav");
const searchInputNav = document.getElementById("search-input-nav"); // search input
let linkTagNav = document.getElementById("a-bt"); // link

fetch(`Models/${type}.json`)
    .then(response => response.json())
    .then(data => {
        console.log("Data: ", data[0]);
        // Get index from ModelNumber:
        let mnrIndex = ""
        if (modelNumberExisting) {
            let modelNumberToFind = params.get("modelNumber");
            for (let i = 0; i < data.length; i++) {
                if (data[i].Info.Overview["Model Number"] == modelNumberToFind) {
                    mnrIndex = i;
                }
            }

            console.log("Index: ", mnrIndex);
        }

        // Use the data to populate the detailed view container
        const detailedViewContainer = document.getElementById("detailed-view-container");
        const detailedView = document.getElementById("detailedView");
        const detailed_heading = document.createElement("h1");

        if (modelNumberExisting) {
            detailed_heading.innerHTML = data[mnrIndex].Name;
        } else {
            detailed_heading.innerHTML = data[paramIndex].Name;
        }

        detailed_heading.classList.add("detailed_heading");
        document.body.insertBefore(detailed_heading, detailedViewContainer);

        // Set the page title dynamically based on the device name
        let deviceName = "";
        if (modelNumberExisting) {
            deviceName = data[mnrIndex].Name;
        } else {
            deviceName = data[paramIndex].Name;
        }
        
        // Update the page title
        document.title = deviceName || "Detailed View";

        // Create image element with proper centering and full visibility
        let imageContainer = document.createElement("div");
        imageContainer.classList.add("image-container");
        
        let image = document.createElement("img");

        if (modelNumberExisting) {
            image.src = `img/${data[mnrIndex].image}`;
            image.id = `detailed-image-${data[mnrIndex].Info.Overview["Model Number"].replace(",", "")}`;
            image.alt = data[mnrIndex].Name;
        } else { 
            image.src = `img/${data[paramIndex].image}`;
            image.id = `detailed-image-${data[paramIndex].Info.Overview["Model Number"].replace(",", "")}`;
            image.alt = data[paramIndex].Name;
        }
        
        image.classList.add("img-detail");
        
        // Ensure image loads properly and maintains aspect ratio
        image.onload = function() {
            console.log(`Image loaded: ${this.src}`);
            // Get natural dimensions and adjust if needed
            const naturalWidth = this.naturalWidth;
            const naturalHeight = this.naturalHeight;
            
            // If image is very small, allow it to display at natural size
            if (naturalWidth <= 200 && naturalHeight <= 200) {
                this.style.width = naturalWidth + 'px';
                this.style.height = naturalHeight + 'px';
            }
            // If image is large, respect the max-width/height constraints
            else {
                this.style.width = 'auto';
                this.style.height = 'auto';
            }
        };
        
        image.onerror = function() {
            console.error(`Failed to load image: ${this.src}`);
            this.style.display = 'none';
        };
        
        imageContainer.appendChild(image);
        document.body.insertBefore(imageContainer, detailedViewContainer);

        // Enhanced card creation with better structure
        if (modelNumberExisting) {
            for (let key in data[mnrIndex].Info) {
                const item_container = document.createElement("div");
                item_container.setAttribute("data-aos", "fade-up");
                item_container.classList.add("item-container");
                
                // Create header with icon
                const header = document.createElement("h2");
                header.className = "item_heading";
                
                // Create icon element
                const icon = document.createElement("span");
                icon.className = "material-symbols-outlined heading-icon";
                
                // Determine icon based on section name
                const sectionName = key.toLowerCase();
                if (sectionName.includes('overview') || sectionName.includes('general')) {
                    icon.textContent = 'info';
                } else if (sectionName.includes('processor') || sectionName.includes('cpu') || sectionName.includes('chip')) {
                    icon.textContent = 'memory';
                } else if (sectionName.includes('software') || sectionName.includes('operating') || sectionName.includes('os') || sectionName.includes('system')) {
                    icon.textContent = 'settings';
                } else if (sectionName.includes('memory') || sectionName.includes('ram') || sectionName.includes('storage')) {
                    icon.textContent = 'storage';
                } else if (sectionName.includes('graphics') || sectionName.includes('video') || sectionName.includes('gpu')) {
                    icon.textContent = 'memory';
                } else if (sectionName.includes('display') || sectionName.includes('screen') || sectionName.includes('resolution')) {
                    icon.textContent = 'monitor';
                } else if (sectionName.includes('network') || sectionName.includes('wifi') || sectionName.includes('ethernet') || sectionName.includes('connectivity')) {
                    icon.textContent = 'wifi';
                } else if (sectionName.includes('audio') || sectionName.includes('sound') || sectionName.includes('speaker')) {
                    icon.textContent = 'volume_up';
                } else if (sectionName.includes('port') || sectionName.includes('connection') || sectionName.includes('input') || sectionName.includes('output')) {
                    icon.textContent = 'cable';
                } else if (sectionName.includes('power') || sectionName.includes('battery') || sectionName.includes('energy')) {
                    icon.textContent = 'battery_full';
                } else if (sectionName.includes('physical') || sectionName.includes('dimension') || sectionName.includes('size') || sectionName.includes('weight')) {
                    icon.textContent = 'straighten';
                } else if (sectionName.includes('price') || sectionName.includes('cost') || sectionName.includes('msrp')) {
                    icon.textContent = 'payments';
                } else if (sectionName.includes('support') || sectionName.includes('compatibility') || sectionName.includes('requirement')) {
                    icon.textContent = 'support';
                } else if (sectionName.includes('camera') || sectionName.includes('photo') || sectionName.includes('video')) {
                    icon.textContent = 'photo_camera';
                } else if (sectionName.includes('security') || sectionName.includes('touch') || sectionName.includes('id') || sectionName.includes('biometric')) {
                    icon.textContent = 'fingerprint';
                } else if (sectionName.includes('keyboard') || sectionName.includes('input') || sectionName.includes('trackpad')) {
                    icon.textContent = 'keyboard';
                } else if (sectionName.includes('environmental') || sectionName.includes('temperature') || sectionName.includes('humidity')) {
                    icon.textContent = 'thermostat';
                } else if (sectionName.includes('packaging') || sectionName.includes('box') || sectionName.includes('included')) {
                    icon.textContent = 'inventory_2';
                } else if (sectionName.includes('timeline') || sectionName.includes('history') || sectionName.includes('release')) {
                    icon.textContent = 'schedule';
                } else {
                    // Default icon for unknown sections
                    icon.textContent = 'category';
                }
                
                // Create text span for the heading title
                const headerText = document.createElement("span");
                headerText.className = "heading-text";
                headerText.textContent = key;
                
                // Append icon and text to header
                header.appendChild(icon);
                header.appendChild(headerText);
                item_container.appendChild(header);
                
                // Create content container
                const contentContainer = document.createElement("div");
                contentContainer.className = "item-container-content";
                
                // Process each detail
                for (let detail in data[mnrIndex].Info[key]) {
                    let infoValue = String(data[mnrIndex].Info[key][detail]);
                    
                    // Create detail item
                    const detailItem = document.createElement("div");
                    detailItem.className = "detail-item";
                    
                    // Create label
                    const label = document.createElement("div");
                    label.className = "detail-label";

                    // Check if this is an OS type and the detail is "Model Identifier"
                    let labelText = detail.replace(/_/g, " ");
                    if ((type === "iOS" || type === "iPhoneOS" || type === "macOS" || type === "watchOS" || type === "iPadOS" || type === "visionOS") && 
                        detail === "Model Identifier") {
                        labelText = "Latest";
                    }

                    label.innerHTML = labelText;
                    
                    // Create value
                    const value = document.createElement("div");
                    value.className = "detail-value";
                    
                    // Determine value type and apply appropriate styling
                    if (detail.toLowerCase().includes('date') || detail.toLowerCase().includes('introduced')) {
                        value.className += " date-data";
                    }
                    
                    // Check if this is a Discontinued field and add status indicator
                    if (detail.toLowerCase().includes('discontinued')) {
                        value.className += " discontinued-data";
                        
                        // Create status container
                        const statusContainer = document.createElement("div");
                        statusContainer.className = "status-container";
                        
                        // Create status dot
                        const statusDot = document.createElement("span");
                        statusDot.className = "status-dot";
                        
                        // Determine if device is discontinued
                        const isDiscontinued = infoValue.toLowerCase().includes('yes') || 
                                             infoValue.toLowerCase().includes('true') ||
                                             (infoValue.toLowerCase() !== 'no' && 
                                              infoValue.toLowerCase() !== 'false' && 
                                              infoValue.toLowerCase() !== 'current' &&
                                              infoValue.toLowerCase() !== '--' &&
                                              infoValue.toLowerCase() !== '-' &&
                                              infoValue.toLowerCase() !== '---' &&
                                              infoValue.trim() !== '' &&
                                              infoValue.toLowerCase() !== 'n/a');
                        
                        if (isDiscontinued) {
                            statusDot.className += " discontinued";
                            statusDot.setAttribute('title', 'Device Discontinued');
                        } else {
                            statusDot.className += " current";
                            statusDot.setAttribute('title', 'Device Current');
                        }
                        
                        // Create text span
                        const statusText = document.createElement("span");
                        statusText.className = "status-text";
                        statusText.innerHTML = infoValue;
                        
                        statusContainer.appendChild(statusDot);
                        statusContainer.appendChild(statusText);
                        value.appendChild(statusContainer);
                    } else if (detail.toLowerCase().includes('original os') || detail.toLowerCase().includes('maximum os')) {
                        // Apply OS linking for Original OS and Maximum OS fields
                        value.innerHTML = createOSLink(infoValue);
                    } else if (detail.toLowerCase().includes('supported devices') || detail.toLowerCase().includes('supported')) {
                        // Apply device linking for Supported Devices and Supported fields
                        value.innerHTML = convertSupportedDevicesToLinkedList(infoValue);
                    } else {
                        // Always use innerHTML for better rendering for other fields
                        value.innerHTML = infoValue;
                    }
                    
                    detailItem.appendChild(label);
                    detailItem.appendChild(value);
                    contentContainer.appendChild(detailItem);
                }
                
                item_container.appendChild(contentContainer);
                detailedView.appendChild(item_container);
            }
        } else {
            for (let key in data[paramIndex].Info) {
                const item_container = document.createElement("div");
                item_container.className = "item_container";
                
                const title = document.createElement("div");
                title.className = "title";
                title.innerHTML = key;
                item_container.appendChild(title);
                
                const contentContainer = document.createElement("div");
                contentContainer.className = "content_container"; // Add this class
                
                for (let detail in data[paramIndex].Info[key]) {
                    const detailItem = document.createElement("div");
                    detailItem.className = "detail";
                    
                    const label = document.createElement("div");
                    label.className = "label";
                    label.innerHTML = detail + ":";
                    
                    const value = document.createElement("div");
                    value.className = "value";
                    
                    const infoValue = data[paramIndex].Info[key][detail];
                    
                    if (detail.toLowerCase() === 'availability') {
                        // Create status container
                        const statusContainer = document.createElement("div");
                        statusContainer.className = "status-container";
                        
                        // Create colored dot
                        const statusDot = document.createElement("span");
                        statusDot.className = "status-dot";
                        
                        // Set color based on availability status
                        if (infoValue.toLowerCase().includes("discontinued")) {
                            statusDot.className += " discontinued";
                            statusDot.setAttribute('title', 'Device Discontinued');
                        } else {
                            statusDot.className += " current";
                            statusDot.setAttribute('title', 'Device Current');
                        }
                        
                        // Create text span
                        const statusText = document.createElement("span");
                        statusText.className = "status-text";
                        statusText.innerHTML = infoValue;
                        
                        statusContainer.appendChild(statusDot);
                        statusContainer.appendChild(statusText);
                        value.appendChild(statusContainer);
                    } else if (detail.toLowerCase().includes('original os') || detail.toLowerCase().includes('maximum os')) {
                        // Apply OS linking for Original OS and Maximum OS fields
                        value.innerHTML = createOSLink(infoValue);
                    } else if (detail.toLowerCase().includes('supported devices') || detail.toLowerCase().includes('supported')) {
                        // Apply device linking for Supported Devices and Supported fields
                        value.innerHTML = convertSupportedDevicesToLinkedList(infoValue);
                    } else {
                        // Always use innerHTML for better rendering for other fields
                        value.innerHTML = infoValue;
                    }
                    
                    detailItem.appendChild(label);
                    detailItem.appendChild(value);
                    contentContainer.appendChild(detailItem);
                }
                
                item_container.appendChild(contentContainer);
                detailedView.appendChild(item_container);
            }
        }
        
        detailedViewContainer.appendChild(detailedView);
        
        // Initialize footer after content is loaded
        initializeFooter();
    })
    .catch(error => {
        console.error('Error loading data:', error);
        // Show error message and still initialize footer
        initializeFooter();
    });

// Footer initialization function
function initializeFooter() {
    // Wait for main.js variables to be available
    setTimeout(() => {
        if (typeof version !== 'undefined' && typeof build !== 'undefined' && typeof commit !== 'undefined') {
            const versionInfoElements = document.querySelectorAll('.version-info');
            if (versionInfoElements.length >= 4) {
                versionInfoElements[0].textContent = `Version ${version} (Build ${build})`;
                versionInfoElements[1].textContent = `Commit: ${commit}`;
                versionInfoElements[2].textContent = `©2023-2025 MangoCoding-Inc. (Felix)`;
                versionInfoElements[3].textContent = "All rights reserved.";
            }
        }
    }, 300);
}






