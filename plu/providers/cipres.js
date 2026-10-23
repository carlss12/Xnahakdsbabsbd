/**
 * Ciprés - fuentes adicionales para canales en vivo
 * Se activa al abrir un canal del catálogo (id "cbl-<canal>") y devuelve las fuentes guardadas aquí abajo.
 * Si una fuente deja de funcionar, se cambia la URL en CHANNELS (o se agrega otra a la lista del canal).
 */
var DEBUG = true; // true: si el canal se reconoce pero no sale nada, aparece una entrada "DIAGNOSTICO". Poner en false al terminar de probar.
var VERSION = "1.1.0";
var LABEL = "Lat 1";
var PREFIX = "cbl-";

// canal del catalogo -> [[nombre a mostrar, [urls en orden de prioridad]], ...]
var CHANNELS = {
  "espn": [["ESPN", ["http://181.119.185.32:8000/play/a004/index.m3u8?hls", "http://181.224.255.210:8001/play/a0sd/index.m3u8?hls"]]],
  "espn-2": [["ESPN 2", ["http://38.226.49.253:8000/play/a06g/index.m3u8?hls", "http://190.60.45.197:2222/play/a038/index.m3u8?hls"]]],
  "espn-3": [["ESPN 3", ["http://190.102.120.20:8000/play/a043/index.m3u8?hls", "http://38.226.49.253:8000/play/a07g/index.m3u8?hls"]]],
  "espn-4": [["ESPN 4", ["http://38.226.49.253:8000/play/a065/index.m3u8?hls", "http://181.224.255.210:8001/play/a0og/index.m3u8?hls"]]],
  "espn-5": [["ESPN 5", ["http://38.226.49.253:8000/play/a078/index.m3u8?hls", "http://181.119.185.32:8000/play/a00n/index.m3u8?hls"]]],
  "espn-6": [["ESPN 6", ["http://190.60.45.197:2222/play/a027/index.m3u8?hls", "http://38.226.49.253:8000/play/a05p/index.m3u8?hls"]]],
  "espn-7": [["ESPN 7", ["http://190.60.45.197:2222/play/a04k/index.m3u8?hls", "http://38.226.49.253:8000/play/a087/index.m3u8?hls"]]],
  "espn-premium": [["ESPN Premium", ["http://38.226.49.253:8000/play/a07t/index.m3u8?hls", "http://181.224.255.210:8001/play/a0pt/index.m3u8?hls"]]],
  "fox-sports": [["Fox Sports", ["http://liontv.es:8080/Euphoria/Euphoria2023/388690"]]],
  "fox-sports-2": [["Fox Sports 2", ["http://liontv.es:8080/Euphoria/Euphoria2023/473005"]]],
  "fox-sports-3": [["Fox Sports 3", ["http://liontv.es:8080/Euphoria/Euphoria2023/345278"]]],
  "dsports": [["DSports", ["http://38.187.7.252:8000/play/a03d/index.m3u8", "http://190.117.20.37:8000/play/a08d/38457924.m3u8"]], ["DirecTV Sports", ["http://181.224.255.210:8001/play/a0s8/index.m3u8?hls"]]],
  "tudn": [["TUDN", ["http://play.pelusa.online:8080/4SpexjF76RbM1/AW4m6zLkCqNt/31129"]]],
  "liga-1-max": [["Liga 1 MAX", ["http://38.226.49.253:8000/play/a0g4/index.m3u8?hls"]]],
  "hbo": [["HBO", ["http://181.119.185.32:8000/play/a00o/index.m3u8?hls", "http://181.224.255.210:8001/play/a0f161/index.m3u8?hls"]]],
  "hbo-2": [["HBO 2", ["http://181.119.185.32:8000/play/a01c/index.m3u8?hls", "http://38.226.49.253:8000/play/a030/index.m3u8?hls"]]],
  "hbo-family": [["HBO Family", ["http://38.226.49.253:8000/play/a033/index.m3u8?hls", "http://181.224.255.210:8001/play/a0nv/index.m3u8?hls"]]],
  "hbo-plus": [["HBO Plus", ["http://181.119.185.32:8000/play/a01d/index.m3u8?hls", "http://181.224.255.210:8001/play/a0qz/index.m3u8?hls"]]],
  "hbo-mundi": [["HBO Mundi", ["http://181.224.255.210:8001/play/a0rf/index.m3u8?hls", "http://38.226.49.253:8000/play/a04k/index.m3u8?hls"]]],
  "hbo-pop": [["HBO Pop", ["http://181.224.255.210:8001/play/a0on/index.m3u8?hls"]]],
  "hbo-signature": [["HBO Signature", ["http://38.226.49.253:8000/play/a04j/index.m3u8?hls", "http://181.224.255.210:8001/play/a0re/index.m3u8?hls"]]],
  "hbo-xtreme": [["HBO Xtreme", ["http://181.224.255.210:8001/play/a0nw/index.m3u8?hls", "http://38.226.49.253:8000/play/a07w/index.m3u8?hls"]]],
  "tnt": [["TNT", ["http://190.102.120.20:8000/play/a045/index.m3u8?hls", "http://181.119.185.32:8000/play/a017/index.m3u8?hls"]]],
  "cinemax": [["Cinemax", ["http://38.226.49.253:8000/play/a0ax/index.m3u8?hls", "http://190.102.120.20:8000/play/a00b/index.m3u8?hls"]]],
  "space": [["Space", ["http://181.119.185.32:8000/play/a00d/index.m3u8?hls", "http://190.102.120.20:8000/play/a00c/index.m3u8?hls"]]],
  "warner-channel": [["Warner Channel", ["http://38.226.49.253:8000/play/a061/index.m3u8?hls"]]],
  "cinecanal": [["Cinecanal", ["http://181.224.255.210:8001/play/a0ob/index.m3u8?hls", "http://38.226.49.253:8000/play/a05z/index.m3u8?hls"]]],
  "fx": [["FX", ["http://190.102.120.20:8000/play/a019/index.m3u8?hls", "http://181.119.185.32:8000/play/a00a/index.m3u8?hls"]]],
  "golden": [["Golden", ["http://181.224.255.210:8001/play/a0qv/index.m3u8?hls", "http://38.226.49.253:8000/play/a09m/index.m3u8?hls"]]],
  "tooncast": [["Tooncast", ["http://190.102.120.20:8000/play/a02t/index.m3u8?hls", "http://38.226.49.253:8000/play/a03u/index.m3u8?hls"]]],
  "azteca-uno": [["Azteca Uno", ["http://play.pelusa.online:8080/4SpexjF76RbM1/AW4m6zLkCqNt/32663", "http://187.245.231.226:8000/play/a0uz/index.m3u8"]]],
  "telefe": [["Telefe", ["http://181.224.255.210:8001/play/a0q5/index.m3u8?hls"]]],
  "nickelodeon": [["Nickelodeon", ["http://181.119.185.32:8000/play/a015/index.m3u8?hls", "http://181.224.255.210:8001/play/a0ol/index.m3u8?hls"]]]
};

function slugFromId(id) {
  var s = String(id || "").toLowerCase(), i = s.indexOf(PREFIX);
  return i < 0 ? "" : s.slice(i + PREFIX.length);
}

async function getStreams(tmdbId, type, season, episode) {
  if (type !== "tv" || !tmdbId) return [];
  var slug = slugFromId(tmdbId);
  var grupos = slug && CHANNELS[slug];
  if (!grupos) return []; // no es un canal de este plugin: no estorbar
  var results = [], seen = {};
  grupos.forEach(function (g) {
    g[1].forEach(function (url, n) {
      if (seen[url]) return;
      seen[url] = true;
      results.push({ name: LABEL, title: g[0] + " · Opción " + (n + 1), url: url, quality: "EN VIVO", headers: {} });
    });
  });
  if (results.length) return results;
  return DEBUG ? [{ name: LABEL, title: "", url: "https://example.com/", quality: "🛠 DIAGNOSTICO (no reproducir)\nsin fuentes para " + slug + " (v" + VERSION + ")", headers: {} }] : [];
}

exports.getStreams = getStreams;
exports._slug = slugFromId;
