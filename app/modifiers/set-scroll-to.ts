import Modifier from "ember-modifier";
import { service } from "@ember/service";
import ActiveInstitutions from "critical-drugs/services/active-institutions";

export default class SetScrollToModifier extends Modifier {
  @service declare activeInstitutions: ActiveInstitutions;

  modify(element: HTMLDivElement) {
    const scrollTarget = element.querySelector(
      `li.item-${this.activeInstitutions.scrollId}`
    );

    console.log(scrollTarget);
    if (scrollTarget) {
      scrollTarget.scrollIntoView({ block: "start", inline: "nearest" });
      // element.scrollTo({
      //   behavior: "smooth",
      //   top: scrollTarget.getBoundingClientRect().top,
      // });
    }
  }
}
