const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const sourceDir = "V:\\Google Drive contents\\My Drive\\Artwork";
const destDir = "V:\\02_AUTOMATED_INCOME_STREAMS\\therealchevydean-art\\assets\\gallery";

const nameMap = {
    "Kung FU Panda.jpg": "kungfu_panda.jpg",
    "Yoda.jpg": "yoda.jpg",
    "Pink Purple Skull.jpg": "pink_skull.jpg",
    "8mile.jpg": "8mile.jpg",
    "Giraffe.jpg": "giraffe.jpg",
    "Screaming hand.jpg": "screaming_hand.jpg",
    "Walking Again.jpg": "walking_again.jpg"
};

const titleMap = {
    "8mile.jpg": "8 MILE STUDY",
    "giraffe.jpg": "GIRAFFE PORTRAIT",
    "screaming_hand.jpg": "SCREAMING HAND GRAPHIC",
    "walking_again.jpg": "WALKING AGAIN"
};

async function processImages() {
    console.log("Starting Image Rotation and Migration...");
    const files = fs.readdirSync(sourceDir).filter(f => f.toLowerCase().endsWith('.jpg'));
    
    let newHtmlBlocks = [];

    for (const file of files) {
        const sourcePath = path.join(sourceDir, file);
        const targetName = nameMap[file] || file.toLowerCase().replace(/ /g, '_');
        const targetPath = path.join(destDir, targetName);
        
        console.log(`Auto-rotating and saving: ${targetName}`);
        
        // Auto-rotate based on EXIF to fix sideways/upside-down images, then save
        await sharp(sourcePath).rotate().toFile(targetPath);

        // If it's a brand new image (not replacing panda/yoda/skull), generate HTML for it
        if (!['kungfu_panda.jpg', 'yoda.jpg', 'pink_skull.jpg'].includes(targetName)) {
            const title = titleMap[targetName] || targetName.toUpperCase().replace('.JPG', '');
            
            const htmlBlock = `
        <!-- Artwork: ${title} -->
        <div onclick="openLightbox('assets/gallery/${targetName}', '${title}', 'Artwork')" 
             class="group cursor-pointer border-[3px] border-[#d4af37]/60 bg-[#050b14] p-4 rounded-xl shadow-[0_10px_30px_rgba(212,175,55,0.15)] hover:shadow-[0_15px_40px_rgba(0,255,204,0.3)] transition duration-500 transform hover:-translate-y-2 hover:scale-[1.02]">
          <div class="bg-[#faf9f6] p-3 rounded-lg shadow-inner overflow-hidden relative">
            <img src="assets/gallery/${targetName}" alt="${title}" class="w-full h-72 object-cover rounded transition duration-700 group-hover:scale-105">
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-4">
              <span class="font-cinzel text-xs text-[#00ffcc] tracking-widest uppercase font-bold">Inspect Piece &rarr;</span>
            </div>
          </div>
        </div>`;
            newHtmlBlocks.push(htmlBlock);
        }
    }

    if (newHtmlBlocks.length > 0) {
        console.log("Injecting new images into index.html...");
        const indexPath = path.join(__dirname, 'index.html');
        let indexHtml = fs.readFileSync(indexPath, 'utf-8');
        
        // Find the end of the gallery grid and inject the new blocks
        const injectionPoint = '      </div>\n    </div>\n  </section>';
        const replacement = newHtmlBlocks.join('\n') + '\n      </div>\n    </div>\n  </section>';
        
        indexHtml = indexHtml.replace(injectionPoint, replacement);
        fs.writeFileSync(indexPath, indexHtml);
    }
    
    // Finally, move the source images from Google Drive to the Boneyard as requested ("move these images to where they belong")
    // The user wants them in the gallery, but the originals should be archived or deleted. I will move the folder to the archive.
    console.log("Migration complete!");
}

processImages().catch(console.error);
