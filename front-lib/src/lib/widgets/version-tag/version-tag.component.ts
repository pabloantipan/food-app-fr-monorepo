import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { getVersion } from "version";


@Component({
  selector: "app-version-tag",
  standalone: true,
  imports: [
    CommonModule,
  ],
  providers: [],
  templateUrl: "./version-tag.component.html",
  styleUrls: ["./version-tag.component.scss"]
})
export class VersionTagComponent {
  version = getVersion();
}
