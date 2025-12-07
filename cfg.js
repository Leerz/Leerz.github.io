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
    const sdVal = Number(values.sd || 128);
    const android = Number(values.android || 0);
    const linux = Number(values.linux || 0);
    const jvfile = 1;
    const emu = consoleVal === 'oled' ? 64 : 32;
    const buffa = Math.floor(emu / 3);
    const totalReserved = emu + android + linux + jvfile + buffa;
    const extra = Math.floor(emu / 6);
    return (sdVal - totalReserved) + extra;
  }
};