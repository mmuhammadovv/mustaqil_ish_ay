const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + process.argv[2]); await p.emulateMedia({media:'print'});
  const opts = { path: process.argv[3], format: 'A4', preferCSSPageSize: true, printBackground: true };
  if (process.argv[4]) Object.assign(opts, { displayHeaderFooter: true, headerTemplate: '<span></span>',
    footerTemplate: '<div style="width:100%;text-align:center;font:11pt Liberation Serif,serif"><span class="pageNumber"></span></div>' });
  await p.pdf(opts); await b.close();
})();
