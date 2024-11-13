import { Test, TestingModule } from "@nestjs/testing"
import { TagsController } from "./tags.controller"
import { TagsService } from "./tags.service"
import { CustomPrismaService, PrismaService } from "nestjs-prisma"
import { mockDeep } from "jest-mock-extended"
import { ExtendedPrismaClient } from "src/prisma/prisma.extension"
import { Logger } from "@nestjs/common"

describe("Tagscontroller", () => {
	let controller: TagsController

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [TagsController],
			providers: [TagsService,
				{
					provide: "PrismaService",
					useValue: mockDeep<CustomPrismaService<ExtendedPrismaClient>>(),
				  },
				  {
					provide: Logger,
					useValue: mockDeep<Logger>(),
				  }
			],
		}).compile()

		controller = module.get<TagsController>(TagsController)
	})

	it("should be defined", () => {
		expect(controller).toBeDefined()
	})
})
