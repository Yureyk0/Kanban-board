import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { DeleteResult, Repository } from 'typeorm';
import { Board } from './entities/board.entity';

describe('BoardsController', () => {
  let boardsController: BoardsController;
  let boardsService: BoardsService;

  const mockBoardRepository: Partial<Repository<Board>> = {};

  beforeEach(() => {
    boardsService = new BoardsService(mockBoardRepository as Repository<Board>);
    boardsController = new BoardsController(boardsService);
  });

  describe('findAll', () => {
    it('should return an array of boards', async () => {
      const mockBoardData = [
        { id: '1', orderIndex: 1, nameBoard: 'Board 1' },
        { id: '2', orderIndex: 2, nameBoard: 'Board 2' },
      ];

      jest.spyOn(boardsService, 'findAll').mockResolvedValue(mockBoardData);

      const result = await boardsController.findAll();

      expect(result).toEqual(mockBoardData);
    });
  });
  describe('findOne', () => {
    it('should return an array of boards', async () => {
      const board: Board = {
        id: '1',
        orderIndex: 1,
        nameBoard: 'Board 1',
        lists: [],
      };
      const boardId = '1';
      jest.spyOn(boardsService, 'findOne').mockResolvedValue(board);

      const result = await boardsService.findOne(boardId);

      expect(result).toEqual(board);
    });
    it('should return null if board is not found', async () => {
      const nonExistentBoardId = '999';
      jest.spyOn(boardsService, 'findOne').mockResolvedValue(null);

      const result = await boardsService.findOne(nonExistentBoardId);

      expect(result).toBeNull();
    });
  });
  describe('remove', () => {
    it('should delete existing board by ID', async () => {
      const deleteResult: DeleteResult = {
        raw: {},
        affected: 1,
      };
      const boardId = '1';
      jest.spyOn(boardsService, 'remove').mockResolvedValue(deleteResult);

      await boardsService.remove(boardId);
    });
    it('should throw NotFoundException for non-existing board', async () => {
      const deleteResult: DeleteResult = {
        raw: {},
        affected: 0,
      };

      const nonExistentBoardId = '999';
      jest.spyOn(boardsService, 'remove').mockResolvedValue(deleteResult);
      await boardsService.remove(nonExistentBoardId);
    });
  });
});
