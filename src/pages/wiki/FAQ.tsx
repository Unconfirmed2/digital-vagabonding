import WikiPage from "./WikiPage";

const FAQ = () => {
  return (
    <WikiPage title="Terraforming Mars FAQ">
      <div className="space-y-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <p className="text-lg text-gray-700 mb-4">
            Common questions and answers for Terraforming Mars, especially useful for digital nomads 
            playing the game while traveling. This FAQ covers both the physical game and the web app version.
          </p>
          
          <div className="bg-white p-4 rounded border">
            <h3 className="font-semibold text-lg mb-2">📚 Want More Detailed FAQ?</h3>
            <p className="text-gray-700">
              A comprehensive unofficial FAQ can be found at{" "}
              <a href="https://github.com/kberg/terraforming-mars-faq/wiki" 
                 target="_blank" rel="noopener noreferrer"
                 className="text-[#064e68] hover:underline">
                the community FAQ wiki
              </a>
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-3 text-[#064e68]">🃏 Why can't I play this card?</h2>
            <p className="text-gray-700 mb-3">Typically you can't play a card because:</p>
            <ol className="list-decimal list-inside text-gray-700 space-y-1">
              <li>You aren't meeting the card's requirements</li>
              <li>The card requires placing a tile in a way that you may not achieve</li>
              <li>You're playing with Turmoil, and the card grants you a TR bonus, but you don't have the money for it</li>
            </ol>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-3 text-[#064e68]">📊 Why doesn't the log show my resource gains?</h2>
            <p className="text-gray-700 mb-3">
              You probably did get the resources. The app doesn't log <em>everything</em> that happens.
            </p>
            <p className="text-gray-700 mb-3">
              This is intentional because:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Logging everything would make the log harder to read</li>
              <li>It would put the app at higher risk of crashing</li>
              <li>The server could run out of disk space</li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-3 text-[#064e68]">🏷️ Why aren't tags on event cards considered?</h2>
            <p className="text-gray-700 mb-3">
              In the physical game, event cards are out of play after being used until the end of the game. 
              Their tags are mainly used for:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Discounts (e.g., building tag for steel)</li>
              <li>Immediate effects (e.g., earth tag discounts)</li>
            </ul>
            <p className="text-gray-700 mt-3">
              Event cards <strong>don't count</strong> for milestones, awards, or ongoing tag effects after being played.
              Only their VP icons count at game end.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-3 text-[#064e68]">🔴 Reds Policy & MC Requirements</h2>
            <p className="text-gray-700 mb-3">
              When Reds are in power, the app only counts MC you have at the start of an action. 
              You cannot use effects that would generate MC during the action to pay for Reds costs.
            </p>
            <p className="text-gray-700">
              This differs from the physical game where you can raise TR before having the MC, 
              as long as you pay by the end of the action.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-3 text-[#064e68]">🌱 Solo Mode Final Greeneries</h2>
            <p className="text-gray-700 mb-3">
              In solo mode, victory is decided immediately at the end of the last generation. You must complete 
              all terraforming parameters <strong>before</strong> placing final greeneries.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>If you haven't completed objectives by final generation, you can't place greeneries</li>
              <li>If you have completed objectives, you may place greeneries to increase your score</li>
              <li>In TR63 variant, final greenery placement doesn't raise oxygen</li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-3 text-[#064e68]">⏰ Game Purging & Storage</h2>
            <p className="text-gray-700 mb-3">
              <strong>Current Status:</strong> Games are purged after 9 days (temporarily reduced from 17 days due to database plan changes).
            </p>
            <p className="text-gray-700 mb-3">
              Game purging prevents the server from running out of storage. Extensions are generally not possible 
              as they require manual intervention and could put the server at risk.
            </p>
            <div className="bg-yellow-50 p-3 rounded border">
              <p className="text-sm text-gray-600">
                💡 <strong>Nomad Tip:</strong> Plan your games accordingly, especially if you're crossing time zones 
                or will have limited internet access for several days.
              </p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-3 text-[#064e68]">💰 Spending Resources Beyond Goals</h2>
            <p className="text-gray-700 mb-3">
              You can spend resources to raise global parameters even after they've reached their maximum. 
              This is legal according to the official rules and useful for "stall actions" in competitive games.
            </p>
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 mt-3">
              "When a global parameter has reached its goal, it can't be raised any further, and so does not increase your TR. 
              You may still play cards and actions that increase the parameter - just ignore that part of the effect."
            </blockquote>
          </div>

          <div className="bg-green-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-3">🌍 Digital Nomad Gaming Tips</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Internet Requirements:</strong> Web app needs stable connection; consider offline versions for poor connectivity areas</li>
              <li><strong>Time Zones:</strong> Plan games with nomads in different zones; async play is possible but has limitations</li>
              <li><strong>Co-working Spaces:</strong> Great for teaching new players; start with base game for beginners</li>
              <li><strong>Mobile Play:</strong> App works on tablets; perfect for plane/train travel</li>
              <li><strong>Game Length:</strong> Base game: 90-120min, With Prelude: 60-90min - plan accordingly for travel days</li>
            </ul>
          </div>
        </div>
      </div>
    </WikiPage>
  );
};

export default FAQ;