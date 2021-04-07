import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tictactoe',
  templateUrl: './tictactoe.component.html',
  styleUrls: ['./tictactoe.component.css'],
})
export class TictactoeComponent implements OnInit {
  constructor() {}

  allEqual = (arr) => arr.every((v) => v === arr[0] && v !== '');

  isBtnDisabled: boolean = false;
  winner: string = '?';
  current_player: string = 'O';
  draw_message: string = 'Draw D:';
  board: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  is_empty(pos) {
    return pos === '';
  }

  play(i, j) {
    if (this.is_empty(this.board[i][j])) {
      this.board[i][j] = this.current_player;
      this.check_winner();
      if (this.current_player === 'O') {
        this.current_player = 'X';
      } else {
        this.current_player = 'O';
      }
    }
  }

  restart() {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board.length; j++) {
        this.board[i][j] = '';
      }
    }

    this.winner = '?';
    this.current_player = 'O';
    this.isBtnDisabled = false;
  }

  check_winner() {
    let finished: Boolean = false;
    for (let i = 0; i < this.board.length; i++) {
      let column: string[] = [];
      for (let j = 0; j < this.board[i].length; j++) {
        column.push(this.board[j][i]);
      }

      if (this.allEqual(this.board[i]) || this.allEqual(column)) {
        finished = true;
        break;
      }
    }

    if (!finished) {
      let first_diagonal: string[] = [],
        second_diagonal: string[] = [];

      for (var i = 0; i < this.board.length; i++) {
        first_diagonal.push(this.board[i][i]);
        second_diagonal.push(this.board[i][this.board.length - i - 1]);
      }

      if (this.allEqual(first_diagonal) || this.allEqual(second_diagonal)) {
        finished = true;
      }
    }

    if (finished) {
      this.winner = this.current_player;
      this.isBtnDisabled = true;
    } else {
      let full_rows: boolean[];
      let full_board: boolean;
      full_rows = this.board.map((e) => {
        return e.every((c) => !this.is_empty(c));
      });

      full_board = full_rows.every(Boolean);

      console.log(full_rows);
      console.log(full_board);

      if (full_board) {
        this.winner = this.draw_message;
        this.isBtnDisabled = true;
      }
    }
  }

  ngOnInit(): void {}
}
