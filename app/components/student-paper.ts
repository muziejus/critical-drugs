import Component from "@glimmer/component";
import ExhibitPage from "emb-line/models/exhibit-page";

interface StudentPaperComponentSignature {
  Args: {
    paper: ExhibitPage;
  }
}

export default class StudentPaperComponent extends Component<StudentPaperComponentSignature> {
  get sortedPageBlocks() {
    return [...this.args.paper.pageBlocks].sort((a, b) => a.order - b.order);
  }
}
