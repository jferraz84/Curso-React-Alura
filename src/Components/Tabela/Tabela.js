import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button/'
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class Tabela extends Component {


    render() {
        const { autores, removeAutor } = this.props;

        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Autor</TableCell>
                        <TableCell>Livro</TableCell>
                        <TableCell>Preco</TableCell>
                        <TableCell>Remover</TableCell>
                    </TableRow>
                </TableHead>
                <TableHead />
                <TableBody>
                    {
                       autores.map(autor => (
                            <TableRow key={autor.id}>
                                <TableCell>{autor.nome}</TableCell>
                                <TableCell>{autor.livro}</TableCell>
                                <TableCell>{autor.preco}</TableCell>
                                <TableCell><Button 
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                    removeAutor(autor.id)}} >Remover</Button>
                                </TableCell>
                            </TableRow> 
                       ))}
                </TableBody>
            </Table>
        );
    }

}
export default Tabela;