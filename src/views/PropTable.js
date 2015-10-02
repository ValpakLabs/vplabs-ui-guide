import React from 'react';
import ReactDOM from 'react-dom/server';
import colors from '../theme/colors';
import {Table, Row, Cell} from './Table';
import InlineCode from './InlineCode';

const PropTable = (props) => {
  if (props.type === 'methods') {
    return (
      <Table>
        {props.rows.map((row, i) => {
          return (
            <Row key={i}>
              <Cell width={300}>{row.method}</Cell>
              <Cell>{row.description}</Cell>
            </Row>
          );
        })}
      </Table>
    );
  }

  return (
    <Table>
      <Row>
        <Cell width={130} style={{fontWeight: 500}}>Property</Cell>
        <Cell width={240} style={{fontWeight: 500}}>Type</Cell>
        <Cell>Description</Cell>
      </Row>

      {props.rows.map((row, i) => {
        return (
          <Row key={i}>
            <Cell>{row.prop}</Cell>
            <Cell>
              {row.typeLabel && <div style={{fontSize: 12, fontStyle: 'italic', color: colors.grey600, marginBottom: 6}}>{row.typeLabel}</div>}
              {row.types.map((type, j) => {
                return (
                  <div key={j} style={{whiteSpace: 'nowrap', display: 'inline-block'}}><InlineCode>{type}</InlineCode>{row.types.length - 1 > j && <span>,&nbsp;&nbsp;</span>}</div>
                );
              })}
            </Cell>
            <Cell>{row.description}</Cell>
          </Row>
        );
      })}
    </Table>
  );
};

export default PropTable;
