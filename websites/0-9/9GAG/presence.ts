import { getAboutDetails } from "./websites/about";
import { getMainDetails } from "./websites/main";
import { getShopDetails } from "./websites/shop";

export const presence = new Presence({
	clientId: "631566704648126503",
});
const browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData = await getFinalDetails({
		largeImageKey: "https://i.imgur.com/t2BG2Fj.png",
		startTimestamp: browsingTimestamp,
	});

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});

async function getFinalDetails(
	presenceData: PresenceData
): Promise<PresenceData> {
	switch (document.location.hostname) {
		case "9gag.com":
			presenceData = { ...presenceData, ...(await getMainDetails()) };
			break;
		case "about.9gag.com":
			presenceData = { ...presenceData, ...(await getAboutDetails()) };
			break;
		case "shop.9gag.com":
			presenceData = { ...presenceData, ...(await getShopDetails()) };
			break;
		default: {
			presence.error(`Unknown hostname: ${document.location.hostname}`);
		}
	}
	return presenceData;
}
