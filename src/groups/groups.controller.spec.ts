import { Test, TestingModule } from "@nestjs/testing"
import { GroupsController } from "./groups.controller"
import { GroupsService } from "./groups.service"
import { Contact } from "src/contacts/entities/contact.entity"
import { ContactsService } from "src/contacts/contacts.service"
import { mockDeep } from "jest-mock-extended"

describe("Groupscontroller", () => {
	let controller: GroupsController

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [GroupsController],
			providers: [GroupsService,
				{
					provide: ContactsService,
					useValue: {
						findAll: jest
							.fn()
							.mockImplementation(async (_userId, _query) => []),
					},
					
				},
				{
					provide: "PrismaService",
					useValue: {},
				  },
			],
		}).compile()

		controller = module.get<GroupsController>(GroupsController)
	})

	it("should be defined", () => {
		expect(controller).toBeDefined()
	})
})
