export default async function SelectStreams(api) {
  const params = [
    "244310065", //ADRIAN1G_ID
    "718236928", //BANDURACARTEL_ID
    "246961124", //mork
    "85039743", //MRDZINOLD_ID
    "720775570", //XKALESON_ID
    "65866610", //XMERGHANI_ID
    "28141853", //YOUNGMULTI_ID
    "138649235", //dobry
    "91229603", //popo
    "89951849", //lukisteve
    "91438833", //mokry
    "153901266", //mlodziutki
    "96308352", //vysotzky
    "112431838", //olsza
    "32401669", //lalastyle
    "101286926", //zony
    "211397835", //masle1
    "32027530", //pisicela
    "247967499", //100pa_
    "112589052", //eizowsky
    "52878701", //vgz2k
    "91538537", //pevor13
    "125658197", //nexe_
    "124026289", //parisplatynov
    "46152491", //testree
    "84413008", //cinkrofwest
    "484019542", //grubamruwa
    "41180913", //navcia
    "130530322", //kubx
    "214022577", //matek
    "72492234", //bladii309
    "157255697", //miszel
    "265367685", //qtjanina
    "68506724", //anterias
    "119992575", //takuu_
    "29357753", //zahaczai
    "28256228", //xlourx
    "32119244", //dzuniorjr
    "37983542", //pyka97
    "25031111", //ctsg
    "238868406", //graf
    "102098555", //kasix
    "416083610", //remsua
    "28151265", //kubson92
    "69616738", //xth0rek
    "130271562", //diables
    "27784991", //skkf
    "74252955", //mamiko
    "440522125", //pokojwytrzezwien
    "139316419", //lilqki
    "788430210", //achtenwlodar
    "435886823", //korniexe
    "435886823", //korniexe
    "589800982", //vessen__
    "501467075", //sarielov
    "250729078", //andrej_here
    "256991721", //madissu
    "146420793", //p4chura
  ];
  const streams = await api.streams.getStreamsByUserIds(params).catch((e) => {
    return null;
  });

  if (streams === null) {
    return null;
  }

  let temp_list = [];

  await Promise.all(
    streams.map((e) => {

      if (e.gameName !== "Minecraft") {
        return;
      }

      const array = e.title.toUpperCase().split(" ");

      if (
        array.includes("YFL") ||
        array.includes("YFLSMP") ||
        array.includes("[YFL]") ||
        array.includes("[YFLSMP]") ||
        array.includes("SMP") ||
        array.includes("[YFL SMP]") ||
        array.includes("[SMP]") ||
        array.includes("[YFL") ||
        array.includes("SMP]") ||
        array.includes("GILDIA") ||
        array.includes("WALKA") ||
        array.includes("WOJNA")
      ) {
        temp_list.push({
          nickname: e.userDisplayName,
          login: e.userName,
          viewers: e.viewers,
        });
      }

      return;
    })
  );

  return {
    last_update: new Date(),
    streams: temp_list,
  };
}
