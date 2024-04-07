CREATE TABLE hospede (
    codigo INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    documento VARCHAR(20) NOT NULL,
    telefone VARCHAR(15) NOT NULL,
    CONSTRAINT uk_hospede_documento UNIQUE (documento)
);

CREATE TABLE acomodacao (
    codigo INT PRIMARY KEY AUTO_INCREMENT,
    tipo VARCHAR(100) NOT NULL,
    descricao VARCHAR(255),
    capacidade INT NOT NULL,
    CONSTRAINT uk_acomodacao_tipo UNIQUE (tipo)
);

CREATE TABLE checkin (
    codigo INT PRIMARY KEY AUTO_INCREMENT,
    hospede_codigo INT NOT NULL,
    acomodacao_codigo INT NOT NULL,
    data_checkin TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_hospede FOREIGN KEY (hospede_codigo) REFERENCES hospede(codigo),
    CONSTRAINT fk_acomodacao FOREIGN KEY (acomodacao_codigo) REFERENCES acomodacao(codigo)
);