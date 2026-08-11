import { activityData } from "@/components/activity/activityData";
import ActivitySection from "@/components/activity/ActivitySection";

export default function index() {
  return (
    <div className="p-6">
      <ActivitySection activities={activityData} />
    </div>
  );
}
