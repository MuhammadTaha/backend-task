import { Logger, Module } from "@nestjs/common"
import { GroupsModule } from "src/groups/groups.module"
import { ContactsController } from "./contacts.controller"
import { ContactsService } from "./contacts.service"
import { TagsService } from "src/tags/tags.service"

@Module({
	imports: [GroupsModule],
	controllers: [ContactsController],
	providers: [ContactsService, ContactsController, Logger, TagsService],
	exports: [ContactsService, ContactsController],
})
export class ContactsModule {}
