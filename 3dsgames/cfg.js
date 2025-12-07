const CONFIG = {
  xmlFile: 'prmzng_3dscia_db.xml',  // Change this to your platform XML
  clientFileExt: '.CLI_PRMZ3',
  adminFileExt: '.PRMZ3',
  filebinBucket: 'xlg4kggozbdgsnw4',
  
  // Auto-detected from XML
  platform: null,
  structureType: null,  // 'folders' or 'files'
  adminBasePath: 'z:\\\NINTENDO\\3DS\\CIA\\',
  
  storageControls: [
    {
      id: 'console',
      label: 'Console',
      type: 'select',
      options: [
        { value: '3DSREG', label: '3DSREG' },
        { value: '3DSXL', label: '3DSXL' },
        { value: '2DS', label: '2DS' },
        { value: 'NEW3DSREG', label: 'NEW3DSREG' },
        { value: 'NEW2DSXL', label: 'NEW2DSXL' },
        { value: 'NEW3DSXL', label: 'NEW3DSXL' }
      ],
      default: '3DSREG',
      filenameToken: true
    },
    {
      id: 'SD',
      label: 'SD (GB)',
      type: 'select',
      options: [
        { value: '32', label: '32' },
        { value: '64', label: '64' },
        { value: '128', label: '128' },
        { value: '256', label: '256' },
        { value: '512', label: '512' }
      ],
      default: '64',
      filenameToken: 'SD',
      storageCalc: true
    },
  ],
  
  calculateStorage: function(values) {
    const consoleVal = values.console || '3DSREG';
    const sdVal = Number(values.SD || 64);
    const buffa = Math.floor(sdVal - (sdVal *.15) );
    const totalReserved = sdVal - buffa;
    return (sdVal - totalReserved);
  }
};