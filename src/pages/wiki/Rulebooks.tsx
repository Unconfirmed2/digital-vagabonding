import WikiPage from "./WikiPage";

const Rulebooks = () => {
  return (
    <WikiPage title="Terraforming Mars Rulebooks">
      <div className="space-y-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">📖 Official Rulebooks</h2>
          <p className="text-gray-700 mb-4">
            Access all the official rulebooks for Terraforming Mars and its expansions. 
            Perfect for referencing rules while playing with fellow nomads!
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Core Game & Expansions</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://fryxgames.se/wp-content/uploads/2023/04/TMRULESFINAL.pdf" 
                     target="_blank" rel="noopener noreferrer"
                     className="text-[#064e68] hover:underline">
                    📋 Base Game Rulebook
                  </a>
                </li>
                <li>
                  <a href="https://www.richardahart.com/wp-content/uploads/games/TerraformingMars/TerraformingMars-HellasAndElysium-Rules.pdf" 
                     target="_blank" rel="noopener noreferrer"
                     className="text-[#064e68] hover:underline">
                    🌍 Hellas & Elysium
                  </a>
                </li>
                <li>
                  <a href="https://cdn.1j1ju.com/medias/6f/8f/c8-terraforming-mars-venus-next-rulebook.pdf" 
                     target="_blank" rel="noopener noreferrer"
                     className="text-[#064e68] hover:underline">
                    ♀️ Venus Next
                  </a>
                </li>
                <li>
                  <a href="https://cdn.1j1ju.com/medias/55/6a/42-terraforming-mars-colonies-rulebook.pdf" 
                     target="_blank" rel="noopener noreferrer"
                     className="text-[#064e68] hover:underline">
                    🏭 Colonies
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Additional Expansions</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://cdn.1j1ju.com/medias/45/35/b4-terraforming-mars-turmoil-rulebook.pdf" 
                     target="_blank" rel="noopener noreferrer"
                     className="text-[#064e68] hover:underline">
                    🏛️ Turmoil
                  </a>
                </li>
                <li>
                  <a href="https://cdn.1j1ju.com/medias/6e/a5/22-terraforming-mars-prelude-rulebook.pdf" 
                     target="_blank" rel="noopener noreferrer"
                     className="text-[#064e68] hover:underline">
                    🚀 Prelude
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">🎥 How to Play (Web App)</h2>
          <p className="text-gray-700 mb-4">
            Learn how to use the digital version of Terraforming Mars - great for playing 
            remotely with other nomads around the world!
          </p>
          
          <ul className="space-y-3">
            <li>
              <a href="https://www.youtube.com/watch?v=Fe6lXmEyfl4&list=PLCGE78n9vCqhhmRe9YCrRh2GLNMPB_3j1&index=2&ab_channel=Leggup" 
                 target="_blank" rel="noopener noreferrer"
                 className="text-[#064e68] hover:underline flex items-center">
                📺 How to Set Up a Game
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/watch?v=qe1vfobxEu8&list=PLCGE78n9vCqhhmRe9YCrRh2GLNMPB_3j1&index=3&t=44s&ab_channel=Leggup" 
                 target="_blank" rel="noopener noreferrer"
                 className="text-[#064e68] hover:underline flex items-center">
                🎮 Game Layout Tutorial
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/watch?v=0unkDBOAw2A&list=PLCGE78n9vCqhhmRe9YCrRh2GLNMPB_3j1&index=4&t=3s&ab_channel=Leggup" 
                 target="_blank" rel="noopener noreferrer"
                 className="text-[#064e68] hover:underline flex items-center">
                🏛️ Turmoil Boards Guide
              </a>
            </li>
          </ul>
        </div>

        <div className="bg-yellow-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">🌟 Nomad Tips</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Download PDFs for offline access when traveling to areas with poor internet</li>
            <li>The base game rulebook is essential - bookmark it on your phone</li>
            <li>Start with the base game if teaching new players at hostels or co-working spaces</li>
            <li>Prelude expansion makes games shorter - perfect for travel days</li>
            <li>Use the web app for remote games with nomad friends in different time zones</li>
          </ul>
        </div>
      </div>
    </WikiPage>
  );
};

export default Rulebooks;