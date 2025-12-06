const CONFIG = {
  xmlFile: 'prmzng_NDS_db.xml',  // Change this to your platform XML
  clientFileExt: '.CLI_PRMZN',
  adminFileExt: '.PRMZN',
  filebinBucket: 'xlg4kggozbdgsnw4',
  
  // Auto-detected from XML
  platform: null,
  structureType: null,  // 'folders' or 'files'
  adminBasePath: 'Z:\\NINTENDO\\NDS\\',
  
  storageControls: [
    {
      id: 'console',
      label: 'Console',
      type: 'select',
      options: [
        { value: 'ndsfat', label: 'dsfat' },
        { value: 'ndslite', label: 'dslite' },
        { value: 'ndsi', label: 'dsi' },
        { value: 'ndsixl', label: 'dsixl' }
      ],
      default: 'ndslite',
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
      default: '32',
      filenameToken: 'sd',
      storageCalc: true
    },
  ],
  
  calculateStorage: function(values) {
    const consoleVal = values.console || 'fat';
    const sdVal = Number(values.sd || 32);
    const buffa = Math.floor(sdVal - (sdVal *.05) );
    const totalReserved = sdVal - buffa;
    return (sdVal - totalReserved);
  }
};