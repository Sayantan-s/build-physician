from enum import Enum

class Language(Enum):
    TYPESCRIPT = ("typescript", ["deno", "deno-ts"])
    GO = ("go", ["go", "golang"])
    JAVASCRIPT = ("javascript", ["node-javascript", "node-js", "javascript", "js"])
    PYTHON = ("python", ["py", "py3", "python3", "python3.10"])
    RUST = ("rust", ["rs"])

    def __init__(self, language: str, aliases: list):
        self._value_ = language
        self.aliases = aliases