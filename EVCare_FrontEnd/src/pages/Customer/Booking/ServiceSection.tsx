import React from "react";
import { Checkbox, Label, Required, ServiceOption } from "./BookingForm.styled";
import type { ServiceCategoryViewModel } from "../../../models/ServicesModel/ServiceCategoryViewModel";
import MoreInfo from "./MoreInfor";

interface Props {
  serviceCategories: ServiceCategoryViewModel[];
  handleServiceCategoriesChange: (serviceCategory: ServiceCategoryViewModel) => void;
  handleSelectServices: (serviceId: number) => void;
  selectedServices: number[];
}

function ServiceComponent({
  serviceCategories,
  handleServiceCategoriesChange,
  handleSelectServices,
  selectedServices,
}: Props) {
  return (
    <>
      <Label>
        Service <Required>*</Required>
      </Label>

      {serviceCategories.map((c) => {
        return (
          <ServiceOption key={c.name}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Checkbox
                type="checkbox"
                disabled={c.services.length === 0}
                checked={c.services.length > 0 && c.services.every((s) => selectedServices.includes(s.id))}
                onChange={() => handleServiceCategoriesChange(c)}
              />
              <span style={{ marginLeft: "10px", color: c.services.length === 0 ? "#9ca3af" : "inherit" }}>
                {c.name} {c.services.length === 0 && "(No services available)"}
              </span>
            </div>
            <MoreInfo
              selectedServices={selectedServices}
              handleSelectServices={handleSelectServices}
              serviceCategorieModel={c}
            ></MoreInfo>
          </ServiceOption>
        );
      })}
    </>
  );
}

const ServiceSection = React.memo(ServiceComponent);
export default ServiceSection;
