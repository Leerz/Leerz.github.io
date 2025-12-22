const CONFIG = {
  xmlFile: 'prmzng_PS2ISO_db.xml',  // Change this to your platform XML
  clientFileExt: '.CLI_PRMZ2',
  adminFileExt: '.PRMZ2',
  filebinBucket: 'xlg4kggozbdgsnw4',
  
  // Auto-detected from XML
  platform: null,
  structureType: null,  // 'folders' or 'files'
  adminBasePath: 'S:\\SONY\\PS2\\ISO\\dvd\\',
  
  storageControls: [
    {
      id: 'console',
      label: 'Console',
      type: 'select',
      options: [
        { value: 'fat', label: 'fat' },
        { value: 'slim', label: 'slim' }
      ],
      default: 'slim',
      filenameToken: true
    },
    {
      id: 'hdd',
      label: 'hdd (GB)',
      type: 'select',
      options: [
        { value: '500', label: '500' },
        { value: '1000', label: '1000' },
        { value: '2000', label: '2000' },
        { value: '3000', label: '3000' },
        { value: '4000', label: '4000' }
      ],
      default: '500',
      filenameToken: 'hdd',
      storageCalc: true
    },
  ],
  
  calculateStorage: function(values) {
    const consoleVal = values.console || 'fat';
    const hddVal = Number(values.hdd || 64);
    const buffa = Math.floor(hddVal - (hddVal *.10) );
    const totalReserved = hddVal - buffa;
    return (hddVal - totalReserved);
  }
};