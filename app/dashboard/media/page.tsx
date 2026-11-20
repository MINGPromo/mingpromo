import { getMediaFiles } from "@/app/actions/upload";
import { MediaManager } from "@/components/dashboard/media-manager";

export const dynamic = "force-dynamic";

export default async function MediaPage() {
    const files = await getMediaFiles();

    return <MediaManager initialFiles={files} />;
}

