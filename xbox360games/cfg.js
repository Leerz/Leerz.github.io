const CONFIG = {
  xmlFile: 'prmzng_XBOX360GAMES_db.xml',  // Change this to your platform XML
  clientFileExt: '.CLI_PRMZX',
  adminFileExt: '.PRMZX',
  filebinBucket: 'xlg4kggozbdgsnw4',
  
  // Auto-detected from XML
  platform: null,
  structureType: null,  // 'folders' or 'files'
  adminBasePath: 'X:\\xbox360games\\games\\',
  
  storageControls: [
    {
      id: 'console',
      label: 'Console',
      type: 'select',
      options: [
        { value: 'fat', label: 'fat' },
        { value: 'slim', label: 'slim' },
        { value: 'slim-e', label: 'slim E' }
      ],
      default: 'fat',
      filenameToken: true
    },
    {
      id: 'hdd',
      label: 'HDD (GB)',
      type: 'select',
      options: [
        { value: '500', label: '500' },
        { value: '1000', label: '1000' },
        { value: '2000', label: '2000' },
        { value: '3000', label: '3000' },
        { value: '4000', label: '4000' },
        { value: '5000', label: '5000' }
      ],
      default: '500',
      filenameToken: 'hdd',
      storageCalc: true
    },
  ],
  
  calculateStorage: function(values) {
    const consoleVal = values.console || 'fat';
    const hddVal = Number(values.hdd || 500);
    const buffa = Math.floor(hddVal - (hddVal *.18) );
    const totalReserved = hddVal - buffa;
    return (hddVal - totalReserved);
  }
};