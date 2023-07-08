import Component from "@glimmer/component";
import ExhibitPage, { PageBlock } from "critical-drugs/models/exhibit-page";
import FileModel from "critical-drugs/models/file";

interface StudentPaperComponentSignature {
  Args: {
    studentPaper: ExhibitPage;
    files: FileModel[];
  };
}

export default class StudentPaperComponent extends Component<StudentPaperComponentSignature> {
  get sortedPageBlocks(): PageBlock[] {
    return [...this.args.studentPaper.pageBlocks].sort(
      (a, b) => a.order - b.order
    );
  }
}
