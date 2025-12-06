const CONFIG = {
  xmlFile: 'prmzng_PSPISO_db.xml',  // Change this to your platform XML
  clientFileExt: '.CLI_PRMZS',
  adminFileExt: '.PRMZS',
  filebinBucket: 'xlg4kggozbdgsnw4',
  
  // Auto-detected from XML
  platform: null,
  structureType: null,  // 'folders' or 'files'
  adminBasePath: 'Z:\\SONY\\PSP\\_PSP_ISO_GOOD\\',
  
  storageControls: [
    {
      id: 'console',
      label: 'Console',
      type: 'select',
      options: [
        { value: 'fat', label: 'fat' },
        { value: 'slim', label: 'slim' },
        { value: 'brite', label: 'brite' }
      ],
      default: 'slim',
      filenameToken: true
    },
    {
      id: 'sd',
      label: 'sd (GB)',
      type: 'select',
      options: [
        { value: '32', label: '32' },
        { value: '64', label: '64' },
        { value: '128', label: '128' }
      ],
      default: '64',
      filenameToken: 'sd',
      storageCalc: true
    },
  ],
  
  calculateStorage: function(values) {
    const consoleVal = values.console || 'fat';
    const sdVal = Number(values.sd || 64);
    const buffa = Math.floor(sdVal - (sdVal *.10) );
    const totalReserved = sdVal - buffa;
    return (sdVal - totalReserved);
  }
};