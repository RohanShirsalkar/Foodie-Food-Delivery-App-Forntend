import { useState, useContext } from "react";
import Location_Dialog from "./Location_Dialog";
import { AppContext } from "../../context/AppContext";

const Location_Container = () => {
  const { isLocationDialogOpen, openLocationDialog, closeLocationDialog } =
    useContext(AppContext);
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    alert(`Selected Location: ${location}`);
  };

  return (
    <div>
      <Location_Dialog
        isOpen={isLocationDialogOpen}
        onClose={closeLocationDialog}
        onSelectLocation={handleLocationSelect}
      />
    </div>
  );
};

export default Location_Container;
