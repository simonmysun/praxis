program HelloWorld;
{$asmMode intel}
var
   i, c, k  : integer;
   sum      : shortint;
   s        : array [0..1023] of char;
   password : array [0..1023] of char;
   stack    : array [0..1023] of integer;

procedure stack_push(element : integer);
begin
   inc(stack[0]);
   stack[stack[0]] := element;
end;

function stack_pop : integer;
begin
   if (stack[0] > 0) then
   begin
      stack_pop := stack[stack[0]];
      dec(stack[0]);
   end
   else
   begin
      stack_pop := 0;
   end;
end;

procedure stack_clear;
begin
   stack[0] := 0;
end;

procedure print_password;
const
   text     : array [0..51] of integer = (64, 18, 61, 8, 62, 22, 46, 36, 36, 43, 20, 12, 12, 54, 5, 80, 44, 40, 15, 17, 3, 75, 43, 36, 31, 53, 23, 9, 30, 36, 43, 22, 29, 38, 20, 55, 27, 60, 25, 40, 81, 1, 24, 44, 72, 11, 5, 28, 28, 5, 23, 10);
var
   i   : integer;
   tmp : integer;
   c   : char;
begin
   i := 0;
   while (i < 52) do
   begin
      tmp := 0;
      tmp += text[i];
      inc(i);
      tmp += text[i];
      inc(i);
      write(chr(tmp));
   end;
   writeln();
   writeln();
end;

procedure wrong_password;
begin
   writeln();
   writeln('Wrong Password');
   writeln();
   halt;
end;

begin
   writeln('What is the password? ');
   readln(password);
   sum := 0;
   k := 0;
   stack_clear;
   for i := 0 to 25 do
   begin
      c := ord(password[i]);
      sum += c;
      if (c mod 2 = 1) then
         begin
            k := k xor stack_pop();
         end
      else
         stack_push(sum);
   end;
   writeln();
   if (stack[0] = 0) then
      if(k = 77) then
         print_password
      else
         wrong_password
   else
      wrong_password;
end.
