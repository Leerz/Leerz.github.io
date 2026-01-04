const CONFIG = {
  xmlFile: 'switchgames.xml',  // Change this to your platform XML
  clientFileExt: '.CLI_PRMZ',
  adminFileExt: '.PRMZ',
  filebinBucket: 'xlg4kggozbdgsnw4',
  
  // Auto-detected from XML
  platform: null,
  structureType: null,  // 'folders' or 'files'
  adminBasePath: 'K:\\NSP 2021\\',
  
  storageControls: [
    {
      id: 'console',
      label: 'Console',
      type: 'select',
      options: [
        { value: 'v1', label: 'v1' },
        { value: 'v2', label: 'v2' },
        { value: 'lite', label: 'lite' },
        { value: 'oled', label: 'oled' }
      ],
      default: 'v1',
      filenameToken: true
    },
    {
      id: 'sd',
      label: 'SD Card (GB)',
      type: 'select',
      options: [
        { value: '128', label: '128' },
        { value: '256', label: '256' },
        { value: '512', label: '512' },
        { value: '1024', label: '1024' }
      ],
      default: '128',
      filenameToken: 'sd',
      storageCalc: true
    },
    {
      id: 'android',
      label: 'Android (GB)',
      type: 'select',
      options: [
        { value: '0', label: '0' },
        { value: '16', label: '16' },
        { value: '32', label: '32' },
        { value: '64', label: '64' }
      ],
      default: '0',
      filenameToken: 'droid',
      storageCalc: true
    },
    {
      id: 'linux',
      label: 'Linux (GB)',
      type: 'select',
      options: [
        { value: '0', label: '0' },
        { value: '16', label: '16' },
        { value: '32', label: '32' },
        { value: '64', label: '64' }
      ],
      default: '0',
      filenameToken: 'lin',
      storageCalc: true
    }
  ],
  
  calculateStorage: function(values) {
    const consoleVal = values.console || 'v1';
    const sdMarketed = Number(values.sd || 128);
    const androidMarketed = Number(values.android || 0);
    const linuxMarketed = Number(values.linux || 0);

    // Convert marketed → formatted capacity (GB vs GiB, ~7% difference)
    const sdFormatted = { 128: 119, 256: 238, 512: 473, 1024: 953 };
    const sd = sdFormatted[sdMarketed] || Math.floor(sdMarketed * 0.923);
    const emuPartition = consoleVal === 'oled' ? 58 : 29;
    const android = Math.floor(androidMarketed * 0.93);
    const linux = Math.floor(linuxMarketed * 0.93);

    // Constants
    const osSize = 8;           // OS uses ~6-8GB inside emuMMC
    const sdFiles = 1;          // Misc files on SD root
    const androidFiles = android > 0 ? 1 : 0;  // Android boot/config files
    const linuxFiles = linux > 0 ? 1 : 0;      // Linux boot/config files

    // Calculate available space
    const sdRemainder = sd - emuPartition - android - androidFiles - linux - linuxFiles - sdFiles;
    const emuFree = emuPartition - osSize;  // Unused space in emuMMC partition
    const rawSpace = sdRemainder + emuFree;

    // 5% buffer for compressed game expansion (NSZ→NSP, XCZ→XCI)
    return Math.floor(rawSpace * 0.95);
  }
};