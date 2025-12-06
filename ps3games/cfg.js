const CONFIG = {
  xmlFile: 'prmzng_PS3ISO_db.xml',  // Change this to your platform XML
  clientFileExt: '.CLI_PRMZP',
  adminFileExt: '.PRMZP',
  filebinBucket: 'xlg4kggozbdgsnw4',
  
  // Auto-detected from XML
  platform: null,
  structureType: null,  // 'folders' or 'files'
  adminBasePath: 'P:\\PS3ISO\\',
  
  storageControls: [
    {
      id: 'console',
      label: 'Console',
      type: 'select',
      options: [
        { value: 'fat', label: 'fat' },
        { value: 'slim', label: 'slim' },
        { value: 'superslim', label: 'superslim' }
      ],
      default: 'slim',
      filenameToken: true
    },
    {
      id: 'hdd',
      label: 'HDD (GB)',
      type: 'select',
      options: [
        { value: '500', label: '500' },
        { value: '1000', label: '1000' }
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