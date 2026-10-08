const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const startMarker = '<!-- THE VOICE THAT INSPIRED EVERYTHING / THE WORD OF I AM SECTION -->';

let startIndex = html.indexOf(startMarker);
let searchHTML = html.substring(startIndex);
let endOffset = searchHTML.indexOf('</section>') + '</section>'.length;

let oldSection = searchHTML.substring(0, endOffset);

const newSection = `
    <!-- FREE PDF DOWNLOAD SECTION -->
    <section class="w-full py-32 border-t border-white/5 bg-[#050b14] relative">
      <div class="max-w-3xl mx-auto px-6 text-center space-y-12">
        
        <div class="mb-12">
          <p class="font-lora text-2xl md:text-3xl italic text-[#00ffcc] leading-relaxed drop-shadow-[0_0_10px_rgba(0,255,204,0.3)]">
            "This is how you know My voice.<br>
            This is how you know I AM."
          </p>
        </div>
        
        <div class="bg-white/5 border border-white/10 p-10 md:p-14 rounded-2xl shadow-2xl backdrop-blur-sm relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-[#00ffcc]/5 to-transparent opacity-50 pointer-events-none"></div>
          
          <h2 class="font-cinzel text-3xl md:text-4xl font-bold text-white uppercase tracking-widest mb-6 relative z-10">
            Download The Manifesto
          </h2>
          <p class="text-slate-400 font-lora text-lg mb-8 relative z-10">
            Enter your email to receive a free PDF copy of the complete "I AM THAT I AM" manifesto.
          </p>
          
          <form class="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto relative z-10">
            <input type="email" placeholder="Enter your email address" required 
                   class="flex-grow bg-black/50 border border-white/20 rounded-lg px-6 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-[#00ffcc] transition text-center sm:text-left">
            <button type="button" onclick="alert('PDF Link sent to your email!')"
                    class="bg-transparent border-2 border-[#00ffcc] text-[#00ffcc] hover:bg-[#00ffcc] hover:text-black font-cinzel font-bold px-8 py-4 rounded-lg transition duration-300 shadow-[0_0_20px_rgba(0,255,204,0.15)] hover:shadow-[0_0_30px_rgba(0,255,204,0.4)] whitespace-nowrap">
              GET PDF
            </button>
          </form>
        </div>

      </div>
    </section>
`;

let newHtml = html.replace(oldSection, newSection.trim());
fs.writeFileSync('index.html', newHtml, 'utf8');
console.log("Section replaced successfully.");
